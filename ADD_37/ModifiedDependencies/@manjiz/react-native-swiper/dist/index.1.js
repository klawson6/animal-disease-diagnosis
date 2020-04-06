/**
 * react-native-swiper
 *
 * react-native >= 0.55.4
 * react >= 16.3.1
 *
 * Modified based on `leecade/react-native-swiper`
 *
 * @author Manjiz<https://github.com/Manjiz>
 */
import React, { Component } from 'react';
import { View, ScrollView, Dimensions, ActivityIndicator, Platform, } from 'react-native';
import styles from './styles';
const noop = (...args) => { };
const isAndroid = Platform.OS === 'android';
const getOffset = (dir, index, width, height) => {
    const tmp = { x: 0, y: 0 };
    tmp[dir] = (dir === 'x' ? width : height) * index;
    return tmp;
};
export default class default_1 extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            width: 0,
            height: 0,
            offset: { x: 0, y: 0 },
            total: 0,
            pIndex: 0,
            index: 0,
            dir: 'x',
        };
        this.autoScrolling = false;
        this.scrolling = false;
        this.scrollAnimated = false;
        this.realtimeOffset = { x: 0, y: 0 };
        this.$scrollView = React.createRef();
        /**
         * Reset index and autoplay if contentSizeChange.
         */
        this.onContentSizeChange = (contentWidth, contentHeight) => {
            const { loop } = this.props;
            const { width, total, height, dir } = this.state;
            const offset = getOffset(dir, loop && total > 1 ? 1 : 0, width, height);
            this.realtimeOffset = offset;
            this.setState({ index: 0, offset }, () => {
                this.autoplay();
                // workaround-2: In android,
                if (isAndroid) {
                    const node = this.$scrollView.current;
                    node && node.scrollTo(offset);
                }
            });
        };
        this.onLayout = (event) => {
            const { loop } = this.props;
            const { index, total, dir, width, height, } = this.state;
            const { width: layoutWidth, height: layoutHeight } = event.nativeEvent.layout;
            // const layoutWidth = Math.round(event.nativeEvent.layout.width)
            // const layoutHeight = Math.round(event.nativeEvent.layout.height)
            let offsetWouldBeSet = this.realtimeOffset = {};
            const stateWouldBeSet = { width: layoutWidth, height: layoutHeight };
            if (total > 1) {
                let actualIndex = index;
                loop && actualIndex++;
                offsetWouldBeSet = getOffset(dir, actualIndex, layoutWidth, layoutHeight);
            }
            // only update the offset in state if needed, updating offset while swiping
            // causes some bad jumping / stuttering
            if (layoutWidth !== width || layoutHeight !== height) {
                stateWouldBeSet.offset = offsetWouldBeSet;
            }
            this.setState(stateWouldBeSet);
        };
        /**
         * Scroll by index
         */
        this.scrollBy = (step, animated = true) => {
            const { loop } = this.props;
            const { dir, width, height, index, total } = this.state;
            if (this.scrolling || total < 2)
                return;
            const actualIndex = (loop ? 1 : 0) + index;
            const newActualIndex = actualIndex + step;
            let x = 0;
            let y = 0;
            dir === 'x' ? (x = newActualIndex * width) : (y = newActualIndex * height);
            this.scrolling = true;
            this.autoScrolling = true;
            this.scrollAnimated = animated;
            this.setState({
                offset: { x, y },
                autoplayEnd: false
            }, () => {
                this.scrollAnimated = false;
            });
        };
        /**
         * Automatic rolling
         */
        this.autoplay = () => {
            const { children, autoplay, autoplayTimeout, loop, autoplayDirection } = this.props;
            const { index, total, autoplayEnd } = this.state;
            if (!Array.isArray(children) || !autoplay || this.scrolling || autoplayEnd)
                return;
            this.autoplayTimer && clearTimeout(this.autoplayTimer);
            this.autoplayTimer = setTimeout(() => {
                if (!loop && (autoplayDirection ? index === total - 1 : index === 0)) {
                    return this.setState({ autoplayEnd: true });
                }
                else {
                    this.scrollBy(autoplayDirection ? 1 : -1);
                }
            }, autoplayTimeout * 1000);
        };
        /**
         * Scroll begin handle
         */
        this.onScrollBegin = (event) => {
            const { onScrollBeginDrag = noop } = this.props;
            this.scrolling = true;
            onScrollBeginDrag(event, this.fullState(), this);
        };
        /**
         * workaround-3: Android didn't trigger onMomentumScrollEnd after scrollTo().
         */
        this.onScroll = (e) => {
            if (isAndroid && this.autoScrolling) {
                const contentOffset = e.nativeEvent.contentOffset;
                const { dir, offset } = this.state;
                if (Math.abs(Math.round(contentOffset[dir]) - Math.round(offset[dir])) < 2) {
                    this.onAndroidScrollEndTimer && clearTimeout(this.onAndroidScrollEndTimer);
                    // Protect nativeEvent object.
                    const tmpEvent = { nativeEvent: { contentOffset: { x: contentOffset.x, y: contentOffset.y } } };
                    this.onAndroidScrollEndTimer = setTimeout(() => {
                        this.onScrollEnd(tmpEvent);
                    }, 50);
                }
            }
        };
        /**
         * Scroll end handle
         */
        this.onScrollEnd = (e) => {
            const { onMomentumScrollEnd = noop } = this.props;
            this.scrolling = false;
            this.autoScrolling = false;
            // making our events coming from android compatible to updateIndex logic
            const contentOffset = e.nativeEvent.contentOffset;
            this.updateIndexByOffset(contentOffset, () => {
                this.autoplay();
                // if `onMomentumScrollEnd` registered will be called here
                onMomentumScrollEnd(e, this.fullState(), this);
            });
        };
        /*
         * Drag end handle
         */
        this.onScrollEndDrag = (e) => {
            const { horizontal, children } = this.props;
            const { index } = this.state;
            const { contentOffset } = e.nativeEvent;
            const previousOffset = horizontal ? this.realtimeOffset.x : this.realtimeOffset.y;
            const newOffset = horizontal ? contentOffset.x : contentOffset.y;
            if (previousOffset === newOffset && (index === 0 || index === children.length - 1)) {
                this.scrolling = false;
            }
        };
        /**
         * Update index after scroll
         */
        this.updateIndexByOffset = (contentOffset, cb) => {
            const { loop } = this.props;
            let { index, dir, width, height, total } = this.state;
            // Android not setting this onLayout first? https://github.com/leecade/react-native-swiper/issues/582
            !this.realtimeOffset && (this.realtimeOffset = {});
            const diff = (contentOffset[dir] || 0) - (this.realtimeOffset[dir] || 0);
            const step = dir === 'x' ? width : height;
            let loopJump = false;
            // Do nothing if offset no change.
            if (!diff)
                return;
            // Note: if touch very very quickly and continuous,
            // the variation of `index` more than 1.
            // parseInt() ensures it's always an integer
            // index = parseInt(index + Math.round(diff / step) + '')
            let actualIndex = parseInt(Math.round((contentOffset[dir] || 0) / step) + '');
            if (loop) {
                if (actualIndex === 0) {
                    index = total - 1;
                    contentOffset[dir] = step * total;
                    loopJump = true;
                }
                else if (actualIndex === total + 1) {
                    index = 0;
                    contentOffset[dir] = step;
                    loopJump = true;
                }
                else {
                    index = actualIndex - 1;
                }
            }
            const stateWouldBeSet = { index, loopJump };
            this.realtimeOffset = contentOffset;
            // only update offset in state if loopJump is true
            if (loopJump) {
                // when swiping to the beginning of a looping set for the third time,
                // the new offset will be the same as the last one set in state.
                // Setting the offset to the same thing will not do anything,
                // so we increment it by 1 then immediately set it to what it should be,
                // after render.
                if (contentOffset[dir] === this.realtimeOffset[dir]) {
                    stateWouldBeSet.offset = { x: 0, y: 0 };
                    stateWouldBeSet.offset[dir] = (contentOffset[dir] || 0) + 1;
                    this.setState(stateWouldBeSet, () => {
                        this.setState({ offset: contentOffset }, cb);
                    });
                }
                else {
                    stateWouldBeSet.offset = contentOffset;
                    this.setState(stateWouldBeSet, cb);
                }
            }
            else {
                this.setState(stateWouldBeSet, cb);
            }
        };
        this.scrollViewPropOverrides = () => {
            const overrides = {};
            for (let prop in this.props) {
                // if(~scrollResponders.indexOf(prop)
                if (typeof this.props[prop] === 'function'
                    && prop !== 'onMomentumScrollEnd'
                    && prop !== 'renderPagination'
                    && prop !== 'onScrollBeginDrag') {
                    const originResponder = this.props[prop] || noop;
                    overrides[prop] = (e) => originResponder(e, this.fullState(), this);
                }
            }
            return overrides;
        };
        /**
         * Render pagination
         * By default, dots only show when `total` >= 2
         */
        this.renderPagination = () => {
            if (this.state.total <= 1)
                return null;
            const dots = [];
            const ActiveDot = this.props.activeDot || (React.createElement(View, { style: [{
                        backgroundColor: this.props.activeDotColor || '#007aff',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }, this.props.activeDotStyle] }));
            const Dot = this.props.dot || (React.createElement(View, { style: [{
                        backgroundColor: this.props.dotColor || 'rgba(0,0,0,.2)',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }, this.props.dotStyle] }));
            for (let i = 0; i < this.state.total; i++) {
                dots.push(i === this.state.index
                    ? React.cloneElement(ActiveDot, { key: i })
                    : React.cloneElement(Dot, { key: i }));
            }
            return (React.createElement(View, { pointerEvents: 'none', style: [styles[this.state.dir === 'x' ? `pagination_x` : `pagination_y`], this.props.paginationStyle] }, dots));
        };
        this.renderScrollView = (pages) => {
            return (React.createElement(ScrollView, Object.assign({}, this.props, this.scrollViewPropOverrides(), { contentContainerStyle: [styles.wrapper, this.props.style], 
                // contentOffset={this.state.offset}
                onContentSizeChange: this.onContentSizeChange, onMomentumScrollEnd: this.onScrollEnd, onScrollBeginDrag: this.onScrollBegin, onScrollEndDrag: this.onScrollEndDrag, onScroll: this.onScroll, scrollEventThrottle: 50, style: this.props.scrollViewStyle, ref: this.$scrollView }), pages));
        };
    }
    static getDerivedStateFromProps(props, state) {
        const initState = {
            autoplayEnd: false,
            loopJump: false,
            offset: {}
        };
        initState.total = props.children ? props.children.length || 1 : 0;
        const updateIndex = state.pIndex !== props.index;
        if (state.total === initState.total && !updateIndex) {
            // retain the index
            initState.index = state.index;
        }
        else {
            initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
            initState.pIndex = props.index;
        }
        const { width, height } = Dimensions.get('window');
        initState.dir = props.horizontal ? 'x' : 'y';
        initState.width = props.width || state.width || width;
        initState.height = props.height || state.height || height;
        initState.offset[initState.dir] = (initState.dir === 'x' ? initState.width : initState.height) * (props.index + (props.loop ? 1 : 0));
        return initState;
    }
    componentDidMount() {
        this.autoplay();
    }
    componentDidUpdate(prevProps, prevState) {
        const shouldClearAutoPlay = !this.props.autoplay && this.autoplayTimer;
        const indexChanged = prevState.index !== this.state.index;
        this.scrolling = false;
        shouldClearAutoPlay && clearTimeout(this.autoplayTimer);
        // If the index has changed, we notify the parent via the onIndexChanged callback
        if (indexChanged) {
            const { onIndexChanged = noop } = this.props;
            onIndexChanged(this.state.index);
        }
        const { dir } = this.state;
        if (prevState.offset !== this.state.offset && prevState.offset[dir] !== this.state.offset[dir]) {
            const node = this.$scrollView.current;
            // workaround-1: android scrollTo not work after offset changed. (In real device)
            // Android scrollTo didn't trigger onMomentumScrollEnd.
            node && node.scrollTo(Object.assign({}, this.state.offset, { animated: isAndroid || this.scrollAnimated, duration: this.scrollAnimated ? 500 : 1 }));
        }
    }
    componentWillUnmount() {
        this.autoplayTimer && clearTimeout(this.autoplayTimer);
        this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
        this.onAndroidScrollEndTimer && clearTimeout(this.onAndroidScrollEndTimer);
    }
    fullState() {
        return Object.assign({}, this.state, { offset: this.realtimeOffset });
    }
    /**
     * Default render
     */
    render() {
        const { index, total, width, height } = this.state;
        const { children, containerStyle, loop, loadMinimal, loadMinimalSize, loadMinimalLoader, renderPagination, showsPagination, } = this.props;
        // let dir = state.dir
        // let key = 0
        const loopVal = loop ? 1 : 0;
        let pages = [];
        const pageStyle = [{ width, height }, styles.slide];
        const pageStyleLoading = {
            width,
            height,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        };
        // For make infinite at least total > 1
        if (total > 1) {
            // Re-design a loop model for avoid img flickering
            const pagesKeys = Object.keys(children);
            if (loop) {
                pagesKeys.unshift(total - 1 + '');
                pagesKeys.push('0');
            }
            pages = pagesKeys.map((pageIdx, i) => {
                if (loadMinimal) {
                    if (i >= (index + loopVal - loadMinimalSize) &&
                        i <= (index + loopVal + loadMinimalSize)) {
                        return React.createElement(View, { style: pageStyle, key: i }, children[parseInt(pageIdx)]);
                    }
                    else {
                        return (React.createElement(View, { style: pageStyleLoading, key: i }, loadMinimalLoader ? loadMinimalLoader : React.createElement(ActivityIndicator, null)));
                    }
                }
                else {
                    return React.createElement(View, { style: pageStyle, key: i }, children[parseInt(pageIdx)]);
                }
            });
        }
        else {
            pages = React.createElement(View, { style: pageStyle, key: 0 }, children);
        }
        return (React.createElement(View, { onLayout: this.onLayout, style: [styles.container, containerStyle] },
            this.renderScrollView(pages),
            showsPagination && (renderPagination ? renderPagination(index, total, this) : this.renderPagination())));
    }
}
/**
 * @see http://facebook.github.io/react-native/docs/scrollview.html
 */
default_1.defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    removeClippedSubviews: true,
    showsPagination: true,
    loop: true,
    loadMinimalSize: 1,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    automaticallyAdjustContentInsets: false,
};
//# sourceMappingURL=index.1.js.map