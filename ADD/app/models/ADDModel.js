import * as Permissions from "expo-permissions";
import {Alert, AsyncStorage} from "react-native";
import {ScreenOrientation} from "expo";
import NetInfo, {NetInfoStateType} from "@react-native-community/netinfo";
import * as MediaLibrary from "expo-media-library";

export default class ADDModel {

    permissions;
    camera;
    case = {
        assets: []
    };

    constructor() {

    }

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
                console.log(this.permissions);
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
    checkInternetAccess() {
        return new Promise(resolve => {
            this.getSettings()
                .then(settings => {
                    if (!settings) resolve(false);
                    else {
                        this.getInternetAccess(settings)
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
    getInternetAccess(settings) {
        return new Promise(resolve => {
            NetInfo.fetch()
                .then(state => {
                    if (state.isInternetReachable) {
                        if (settings.wifi && state.type === NetInfoStateType.wifi || settings.cell && state.type === NetInfoStateType.cellular) {
                            resolve(true);
                        } else {
                            new Alert.alert("Cannot Upload", "You are currently connected to the internet via: " + state.type + "\nPlease connect to the internet using your preferred network type, specified in settings.");
                            resolve(false);
                        }
                    } else {
                        new Alert.alert("No Internet", "Please connect to the internet to upload your case.");
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
                    console.log("Album at saveAsset: " + album);
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
        console.log("Album at addAsset: " + album);
        return new Promise(resolve => {
            console.log("Album at return Promise: " + album);
            MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
                .then(result => {
                    console.log("Album at return Promise: " + album);
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
}
