package com.easymath.smartcaculator.unitconverter.basiccalculator.homework.helper

import android.util.Log
import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.annotations.ReactPropGroup

class NativeAdsFragmentManager(
    private val reactContext: ReactApplicationContext
) : ViewGroupManager<FrameLayout>() {

    private var propWidth: Int? = null
    private var propHeight: Int? = null
    private var adId: String? = null

    override fun getName() = REACT_CLASS

    /**
     * Return a FrameLayout which will later hold the Fragment
     */
    override fun createViewInstance(reactContext: ThemedReactContext) =
        FrameLayout(reactContext)

    /**
     * Map the "create" command to an integer
     */
    override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */
    override fun receiveCommand(
        root: FrameLayout,
        commandId: String,
        args: ReadableArray?
    ) {
        super.receiveCommand(root, commandId, args)
        val reactNativeViewId = requireNotNull(args).getInt(0)

        when (commandId.toInt()) {
            COMMAND_CREATE -> createFragment(root, reactNativeViewId)
            COMMAND_LOAD_ADS -> loadAds(root, reactNativeViewId)
        }
    }

    @ReactProp(name = "adId")
    fun setAdId(view: FrameLayout, adId: String?) {
        this.adId = adId

        Log.i("NativeAdsFragmentManager", "Ad ID: $adId")

//        val activity = reactContext.currentActivity as? FragmentActivity ?: return
//        val fragmentManager = activity.supportFragmentManager
//        val fragment = fragmentManager.findFragmentById(view.id) as? NativeAdsFragment
//
//        if (fragment == null) {
//            val newFragment = NativeAdsFragment()
//            newFragment.setAdId(adId)
//            fragmentManager.beginTransaction()
//                .replace(view.id, newFragment)
//                .commitNowAllowingStateLoss()
//        } else {
//            fragment.setAdId(adId)
//        }
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: FrameLayout, index: Int, value: Int) {
        if (index == 0) propWidth = value
        if (index == 1) propHeight = value
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
        val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
        setupLayout(parentView)

        val myFragment = NativeAdsFragment()
        myFragment.setAdId(this.adId)
        val activity = reactContext.currentActivity as FragmentActivity
        activity.supportFragmentManager
            .beginTransaction()
            .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
            .commit()
    }

    fun loadAds(root: FrameLayout, reactNativeViewId: Int) {
        Log.i("NativeAdsFragmentManager", "Loading ads...")
        val activity = reactContext.currentActivity as? FragmentActivity ?: return
        val fragmentManager = activity.supportFragmentManager
        val fragment = fragmentManager.findFragmentById(reactNativeViewId) as? NativeAdsFragment
        if (fragment != null) {
            Log.i("NativeAdsFragmentManager", "Fragment found")
            fragment.loadNativeAd()
        }
    }

    fun setupLayout(view: View) {
        Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
            override fun doFrame(frameTimeNanos: Long) {
                manuallyLayoutChildren(view)
                view.viewTreeObserver.dispatchOnGlobalLayout()
                Choreographer.getInstance().postFrameCallback(this)
            }
        })
    }

    /**
     * Layout all children properly
     */
    private fun manuallyLayoutChildren(view: View) {
        // propWidth and propHeight coming from react-native props
        val width = requireNotNull(propWidth)
        val height = requireNotNull(propHeight)

        view.measure(
            View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
            View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY))

        view.layout(0, 0, width, height)
    }

    companion object {
        private const val REACT_CLASS = "NativeAdsFragmentManager"
        private const val COMMAND_CREATE = 1
        private const val COMMAND_LOAD_ADS = 2

    }

}