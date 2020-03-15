import * as Permissions from "expo-permissions";
import {Alert, AsyncStorage} from "react-native";
import {ScreenOrientation} from "expo";
import NetInfo, {NetInfoStateType} from "@react-native-community/netinfo";
import * as MediaLibrary from "expo-media-library";

export default class ADDModel {

    permissions; // Have all permissions been granted
    camera; // A reference to the camera object
    case = { // The current case being built
        assets: []
    };
    isLoaded = false; // Default to a new case

    /**
     * Initialises storage for cases, number of cases, and settings
     */
    initStorage() {
        AsyncStorage.getAllKeys() // Fetch all keys to values from the locally stored data
            .then(keys => {
                if (!keys.includes('numCases')) { // Find the key for the number of cases, if it does not exist, create and initialise it to 0.
                    AsyncStorage.setItem('numCases', '0');
                }
                if (!keys.includes('settings')) { // Find the key for the number of cases, if it does not exist, create and initialise it to 0.
                    AsyncStorage.setItem('settings', JSON.stringify({
                        wifi: true,
                        cell: true,
                        species: null,
                        location: null,
                        name: null
                    }));
                }
            })
            .catch(error => {
                console.log('Error occurred when creating numCases: ' + error);
            });
    }

    /**
     * Initialises the orientation restriction to vertical only.
     */
    initOrientation() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT) // Lock the screen orientation to vertical.
            .then() // Do nothing on success.
            .catch(error => { // Log an error for debugging
                console.log('Error occurred when locking orientation: ' + error)
            });
    }

    /**
     *  Returns true if permissions for the Camera and Media Library have been granted, else returns false.
     **/
    hasPermissions() {
        return this.permissions === "granted";
    }

    /**
     *  Asks the user for necessary permissions.
     *  Will set the state of permissions based on the user's response.
     **/
    initPermissions() {
        Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
            .then(result => {
                this.permissions = result.status; // Set the state of hasPermissions to true if all permissions were granted.
            });
    }

    /**
     *  Initialise the model.
     *
     *  Initialises storage for cases, number of cases, and settings
     *  Initialises the orientation restriction to vertical only.
     *  Initial request for permissions from the user.
     **/
    initialise() {
        this.initStorage();
        this.initOrientation();
        this.initPermissions();
    }

    /**
     *  Retrieves settings and delegates a check for internet settings.
     *
     *  Returns a promise that resolves true if they are connected to the internet by preferred settings,
     *  else returns false and alerts the user
     **/
    checkInternetAccess(alert) {
        return new Promise(resolve => {
            this.getSettings()
                .then(settings => {
                    if (!settings) resolve(false);
                    else {
                        this.getInternetAccess(settings, alert)
                            .then(result => {
                                resolve(result)
                            })
                    }
                })
                .catch(error => {
                    new Alert.alert("Error", "An error occurred fetching your network type.");
                    console.log("Error fetching network state: " + error);
                    resolve(false);
                })
        })
    }

    /**
     *  Checks if the device is connected to the internet and is connected by the preferred settings.
     *
     *  Returns a promise that resolves true if they are connected to the internet by preferred settings,
     *  else returns false and alerts the user
     **/
    getInternetAccess(settings, alert) {
        return new Promise(resolve => {
            NetInfo.fetch()
                .then(state => {
                    if (state.isInternetReachable) {
                        if (settings.wifi && state.type === NetInfoStateType.wifi || settings.cell && state.type === NetInfoStateType.cellular) {
                            resolve(true);
                        } else {
                            if (alert) new Alert.alert("Cannot Upload", "You are currently connected to the internet via: " + state.type + "\nPlease connect to the internet using your preferred network type, specified in settings.");
                            resolve(false);
                        }
                    } else {
                        if (alert) new Alert.alert("No Internet", "Please connect to the internet to upload your case.");
                        resolve(false);
                    }
                })
                .catch(error => {
                    new Alert.alert("Error", "An error occurred fetching your network type.");
                    console.log("Error fetching network state: " + error);
                    resolve(false);
                })
        })
    }

    /**
     *  Gets the user's settings from AsyncStorage
     *
     *  Returns a JSON with the settings if the settings were successfully retrieved from AsyncStorage, else returns null
     **/
    getSettings() {
        return new Promise(resolve => {
            AsyncStorage.getItem("settings")
                .then(settings => {
                    resolve(JSON.parse(settings));
                })
                .catch(err => {
                    console.log("Error fetching settings from home page: " + err);
                    resolve(null);
                });
        })
    }

    /**
     *  Uploads a completed feedback form - object
     *
     *  Returns a promise resolving to true is the upload was successful and a response code 200 was received.
     *  Else returns false
     **/
    uploadFeedback(feedback) {
        return new Promise(resolve => {
            const body = new FormData();
            body.append("feedback", JSON.stringify(feedback));
            fetch('https://devweb2019.cis.strath.ac.uk/~xsb16116/ADD/GatherFeedback.php',
                {
                    method: 'POST',
                    body: body,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Request to server successful.");
                        console.log(response.status);
                        response.text()
                            .then(text => {
                                console.log(text);
                            });

                        resolve(true);
                    } else {
                        console.log("Request to server unsuccessful.");
                        console.log(response.status);
                        response.text()
                            .then(text => {
                                console.log(text);
                            });
                        resolve(false);
                    }
                })
                .catch(error => {
                    console.log("Error making request : " + error);
                    resolve(false);
                });
        })
    }

    /**
     * Saves a completed settings form - object to the AsyncStorage
     *
     * Returns a promise resolving to true if the settings were saved to AsyncStorage, else resolves false
     */
    saveSettings(settings) {
        return new Promise(resolve => {
            AsyncStorage.setItem("settings", JSON.stringify(settings))
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    console.log("Error saving settings: " + error);
                });
        });
    }

    /**
     * Set a reference to the camera, generated from the camera component in the ViewModel
     */
    setCamera(camera) {
        this.camera = camera;
    }

    /**
     * Carries out the process of:
     *      - Capturing an image from the camera,
     *      - Creating a media asset from it
     *      - Adding it to the media library
     *          - If an album for the app exists, add it to that
     *          - Else make it and add it
     *      - Add a reference of the newly created and saved in album asset, to the model
     *      - Return a promise resolving to a reference to the photo (for a thumbnail) if the whole process above was successful
     *      - Resolves to null if not
     */
    takePicture(side) {
        return new Promise(resolve => {
            if (!this.camera) resolve(null);
            const options = {skipProcessing: true, base64: true, exif: true};
            this.camera.takePictureAsync(options)
                .then(photo => {
                    photo.exif.Orientation = 1;
                    this.createAsset(photo)
                        .then(asset => {
                            if (asset) {
                                this.saveAsset(asset)
                                    .then(album => {
                                        if (album) {
                                            this.addImageToCase(album, asset, side)
                                                .then(result => {
                                                    result ? resolve(photo) : resolve(null);
                                                })
                                        } else {
                                            resolve(null);
                                        }
                                    })
                            } else {
                                resolve(null);
                            }
                        });
                })
                .catch(error => {
                    console.log('Error taking photo.', error);
                    resolve(null);
                });
        })
    }

    /**
     * Creates a media library asset from the captured picture.
     *
     * Resolves to the newly created asset if it was created, else resolves to null
     */
    createAsset(photo) {
        return new Promise(resolve => {
            const {uri} = photo;
            MediaLibrary.createAssetAsync(uri)
                .then(asset => {
                    if (asset) {
                        resolve(asset);
                    } else {
                        resolve(null);
                    }
                })
                .catch(error => {
                    console.log('Error creating an asset from captured image: ', error);
                    resolve(null);
                });
        })
    }

    /**
     * Check if the app album exists, and calls the relevant function to save the asset in it if it does, or creates it and saves it.
     *
     * Resolves to the newly created album if the asset was added to the existing or newly created album, else returns null
     */
    saveAsset(asset) {
        return new Promise(resolve => {
            MediaLibrary.getAlbumAsync('Animal Disease Diagnosis')
                .then(album => {
                    if (album) {
                        this.addAssetToAlbum(asset, album,)
                            .then(result => {
                                resolve(result);
                            })
                    } else {
                        this.createAlbum(asset)
                            .then(result => {
                                resolve(result);
                            })
                    }
                })
                .catch(error => {
                    console.log('Error saving image to camera roll: ', error);
                    resolve(null);
                })
        })
    }

    /**
     * Adds an asset to the existing app album
     *
     * Resolves to album if the asset was added to it, else returns false
     */
    addAssetToAlbum(asset, album) {
        return new Promise(resolve => {
            MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
                .then(result => {
                    if (result) {
                        resolve(album);
                    } else {
                        resolve(null);
                    }
                })
                .catch(error => {
                    console.log('Error saving image to camera roll in existing folder: ', error);
                    resolve(null);
                });
        })
    }

    /**
     * Creates a new album for the app and adds the given asset to it.
     *
     * Resolves to the newly created album with the assets added to it, else returns false.
     */
    createAlbum(asset) {
        return new Promise(resolve => {
            MediaLibrary.createAlbumAsync('Animal Disease Diagnosis', asset, false)
                .then(album => {
                    resolve(album);
                })
                .catch(error => {
                    console.log('Error saving image to camera roll in new folder: ', error);
                    resolve(null);
                });
        })
    }

    /**
     * Adds a reference of the captured image to the current case being built in this model.
     * Fetches the new asset from the app album based on file name.
     *
     * Resolves to true if the asset was found in the app album and a reference added to the case object in this model,
     * else resolves false.
     */
    addImageToCase(album, asset, side) {
        return new Promise(resolve => {
            MediaLibrary.getAssetsAsync({album: album, sortBy: ["creationTime"]})
                .then(assets => {
                    for (const a of assets.assets) {
                        if (a.filename === asset.filename) {
                            this.case.assets.push([a, side]);
                            resolve(true);
                            break;
                        }
                    }
                    resolve(false);
                })
                .catch(error => {
                    console.log('Error adding image to case in model:', error);
                    resolve(false);
                });
        })
    }

    /**
     * Return the case currently being built - Used for displaying images or saved form info in View
     */
    getCurrentCase() {
        return this.case;
    }

    /**
     * Get function for all the saved cases
     *
     * Returns a promise resolving to an object containing the saved cases.
     */
    getCases() {
        return new Promise(resolve => {
            let cases = {};
            AsyncStorage.getAllKeys()
                .then(keys => {
                    AsyncStorage.multiGet(keys)
                        .then(results => {
                            results.forEach(item => {
                                if (item[0] !== "numCases" && item[0] !== "settings") cases[item[0]] = JSON.parse(item[1]);
                            });
                            resolve(cases);
                        });
                });
        })

    }

    /**
     * Sets the current case being built to a given case, this is one loaded from AsyncStorage
     */
    setCurrentCase(currentCase) {
        this.case = currentCase;
        this.isLoaded = true;
    }

    /**
     * Initialise the case object for starting to build a new case
     */
    startCase(type) {
        return new Promise(resolve => {
            this.getSettings()
                .then(settings => {
                    this.case = {
                        type: type,
                        assets: [],
                    };
                    this.case = Object.assign({}, this.case, settings);
                    this.getNumCases()
                        .then(result => {
                            if (result !== null) {
                                this.case.caseName = "case" + result;
                                this.isLoaded = false;
                            }
                        });
                    resolve(true);
                })
                .catch(error => {
                    console.log("Error occurred starting a new case: " + error);
                    resolve(false);
                });
        })
    }

    /**
     * Return type of the case currently being built
     */
    getCaseType() {
        return this.case.type;
    }

    /**
     * Retrieves the number of cases saved in AsyncStorage
     *
     * Returns a promise resolving to the value stored at numCases - The number of cases, else resolves null
     */
    getNumCases() {
        return new Promise(resolve => {
            AsyncStorage.getItem("numCases")
                .then(value => {
                    resolve(value);
                })
                .catch(error => {
                    console.log("Error getting number of cases: " + error);
                    resolve(null);
                })
        })
    }

    /**
     * Saves the current case being built to the AsyncStorage.
     * Updates the current case with new form info from the view
     * Marks the case with completeness.
     * Increments the number of saved cases.
     *
     * Returns a promise resolving to true if the case is saved, updated, marked with completeness and increments the number of saved cases.
     * Else resolves false.
     */
    saveCase(toSave) {
        return new Promise(resolve => {
            this.case = Object.assign({}, this.case, toSave);
            this.case.completed = this.checkCase();
            AsyncStorage.setItem(this.case.caseName, JSON.stringify(this.case))
                .then(() => {
                    if (this.isLoaded) {
                        resolve(true);
                    } else {
                        this.incrementNumCases()
                            .then(result => {
                                resolve(result);
                            })
                    }
                })
                .catch(error => {
                    console.log('Error occurred when saving classification: ' + error)
                    resolve(false);
                });
        });
    }

    /**
     * Increments the number of cases saved in AsyncStorage
     *
     * Returns a promise resolving to true if the number of cases in AsyncStorage is incremented, else resolves false.
     */
    incrementNumCases() {
        return new Promise(resolve => {
            this.getNumCases()
                .then(value => {
                    AsyncStorage.setItem('numCases', '' + (parseInt(value) + 1))
                        .then(() => {
                            resolve(true);
                        })
                        .catch(error => {
                            console.log('Error occurred when incrementing numCases: ' + error);
                            resolve(false);
                        });
                })
        })
    }

    /**
     * Checks for the completeness of the case currently being built.
     *
     * Returns true if the case is complete - no null values in required key-vals, else returns false
     */
    checkCase() {
        let complete = true;
        Object.keys(this.case).forEach(k => {
            if (this.case[k] === null && !(this.case.type && k === "diagnosis"))
                complete = false;
        });
        return complete;
    }

    /**
     * Carries out a completeness check on the case currently being built, updates and saves it, then uploads it with the immediate feedback given.
     *
     * Returns a promise resolving to 0, 1, 2, 3, 4, or 5.
     *      - 0: Case was not saved
     *      - 1: Case is not complete so isn't uploaded, but is saved
     *      - 2: Not connected to the internet under preferred conditions, so is not uploaded, but is saved.
     *      - 3: Error when uploading
     *      - 4: Error when contacting server
     *      - 5: Successfully saved and uploaded case
     *      - 6: Uploaded and saved, but failed to mark the case as uploaded
     */
    // checkAndUploadCase(toUpload, feedback) {
    //     return new Promise(resolve => {
    //         console.log("checking case: " + toUpload.caseName);
    //         console.log("with imgs:" + this.case.caseName);
    //         console.log("with isComplete:" + this.case.completed);
    //         this.saveCase(toUpload)
    //             .then(saved => {
    //                 if (saved) {
    //                     console.log("isCompleted" + toUpload.caseName + ":" + this.case.completed);
    //                     if (this.case.completed) {
    //                         this.checkInternetAccess(true)
    //                             .then(connected => {
    //                                 if (connected) {
    //                                     this.uploadCase(toUpload, feedback)
    //                                         .then(result => {
    //                                             if (result) {
    //                                                 toUpload.isUploaded = true;
    //                                                 this.saveCase(toUpload)
    //                                                     .then(saved => {
    //                                                         if (saved) {
    //                                                             console.log("finished checking: " + toUpload.caseName);
    //                                                             console.log("with imgs end:" + this.case.caseName);
    //                                                             resolve(5)
    //                                                         } else {
    //                                                             resolve(6);
    //                                                         }
    //                                                     })
    //                                             } else {
    //                                                 resolve(result);
    //                                             }
    //                                         })
    //                                 } else {
    //                                     resolve(2)
    //                                 }
    //                             })
    //                     } else {
    //                         resolve(1);
    //                     }
    //                 } else {
    //                     resolve(0);
    //                 }
    //             })
    //     });
    // }
    checkAndUploadCase(toUpload, feedback) {
        return new Promise(resolve => {
            this.saveCase(toUpload)
                .then(saved => {
                    if (saved) {
                        if (this.case.completed) {
                            return this.checkInternetAccess(true);
                        } else {
                            resolve(1);
                        }
                    } else {
                        resolve(0);
                    }
                })
                .then(connected => {
                    if (connected) {
                        return this.uploadCase(toUpload, feedback);
                    } else {
                        resolve(2)
                    }
                })
                .then(result => {
                    if (result) {
                        toUpload.isUploaded = true;
                        return this.saveCase(toUpload);
                    } else {
                        resolve(result);
                    }
                })
                .then(saved => {
                    if (saved) {
                        resolve(5)
                    } else {
                        resolve(6);
                    }
                })
        });
    }

    /**
     * Uploads all saved cases that aren't marked as uploaded and are complete.
     * Uploads each applicable case with the feedback given.
     *
     * Returns a promise resolving to an array of the resolve codes that correspond to any errors that occurred:
     *      - 0: Not connected to the internet under preferred conditions, so is nothing uploaded.
     *      - 1: Error when uploading
     *      - 2: Error when contacting the server
     *      - 3: Successfully uploaded cases and updated them as uploaded.
     *      - 4: Successfully uploaded cases but an error occurred saving them as uploaded.
     *      - 5: No cases ot upload
     */
    uploadAll(feedback) {
        return new Promise(resolve => {
            this.checkInternetAccess(true)
                .then(access => {
                    if (access) {
                        this.isLoaded = true;
                        this.getCases()
                            .then(cases => {
                                let fetches = [];
                                Object.keys(cases).forEach(k => {
                                    if (!cases[k].isUploaded && cases[k].completed) {
                                        fetches.push(this.iterateUploadCase(cases[k], feedback));
                                    }
                                });
                                if (fetches.length) {
                                    Promise.all(fetches)
                                        .then(results => {
                                            resolve(results.filter(r => r !== 3));
                                        })
                                } else {
                                    resolve([5]);
                                }
                            })
                    } else {
                        resolve([0]);
                    }
                });
        });
    }

    /**
     * Uploads a given case with feedback, this is the upload function for uploading lots of complete cases.
     * It is more easily iterable thanks to fewer asyncs.
     *
     * Returns a promise resolving to:
     *      - 1: Error when uploading
     *      - 2: Error when contacting the server
     *      - 3: Successfully uploaded cases and updated them as uploaded
     *      - 4: Successfully uploaded cases but an error occurred saving them as uploaded.
     */
    iterateUploadCase(c, feedback) {
        return new Promise(resolve => {
            this.setCurrentCase(c);
            this.uploadCase(c, feedback)
                .then(result => {
                    if (result === 3) {
                        c.isUploaded = true;
                        this.saveCase(c)
                            .then(saved => {
                                if (saved) {
                                    resolve(3)
                                } else {
                                    resolve(4);
                                }
                            })
                    } else {
                        resolve(result);
                    }
                })
        });
    }

    /**
     * Prepares a FormData object of the case
     *
     * Returns the FormData object with the case info set
     */
    prepareCaseForm(toUpload, feedback) {
        const body = new FormData();
        this.case.assets.forEach(img => {
            body.append("images[]", {
                uri: img[0].uri,
                name: img[0].filename,
                type: "image/jpg"
            });
            toUpload.sides.push(img[1]);
        });
        body.append("case", JSON.stringify(toUpload));
        body.append("feedback", feedback);
        return body;
    }

    /**
     * Uploads the currently being built case with the immediate feedback given.
     *
     * Returns a promise resolving to 3, 4, or 5.
     *      - 3: Error when uploading
     *      - 4: Error when contacting server
     *      - 5: Successfully saved and uploaded case
     */
    uploadCase(toUpload, feedback) {
        return new Promise(resolve => {
            const body = this.prepareCaseForm(toUpload, feedback);
            fetch('https://devweb2019.cis.strath.ac.uk/~xsb16116/ADD/ImageCollector.php',
                {
                    method: 'POST',
                    body: body,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Request to server successful.");
                        console.log(response.status);
                        response.text()
                            .then(text => {
                                console.log(text);
                            });
                        resolve(3);
                    } else {
                        console.log("Request to server unsuccessful.");
                        console.log(response.status);
                        response.text()
                            .then(text => {
                                console.log(text);
                            });
                        resolve(2);
                    }
                })
                .catch(error => {
                    console.log("Error making request : " + error);
                    resolve(1);
                });
        });
    }
}
