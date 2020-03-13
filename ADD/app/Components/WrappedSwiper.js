import React, {Component} from "react";
import Swiper from "@manjiz/react-native-swiper";
import {Dimensions, Image, View, StyleSheet} from "react-native";

export default class WrappedSwiper extends Component{

    buildPreview(images) {
        let imgs = [];
        images.forEach(function (img) {
            imgs.push(<Image style={styles.image}
                             key={img[0].filename}
                             source={img[0]}/>);
        });
        return imgs;
    };

    render() {
        return (
            <View style={styles.swipeWrapper}>
                <Swiper
                    containerStyle={styles.swipeContainer}
                    activeDotColor={"#1565c0"}
                    loadMinimal={false}
                    loop={false}
                    width={Dimensions.get("window").width / 3}
                    height={"100%"}>
                    {this.buildPreview(this.props.images)}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    swipeWrapper: {
        flex: 6,
        flexDirection: "column",
    },
    swipeContainer: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#646464',
    },
    image: {
        width: Dimensions.get("window").width / 3,
        height: "100%"
    },
});
