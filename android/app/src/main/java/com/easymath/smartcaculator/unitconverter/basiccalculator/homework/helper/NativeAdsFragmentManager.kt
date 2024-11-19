package com.easymath.smartcaculator.unitconverter.basiccalculator.homework.helper

import android.view.View
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class NativeAdsFragmentManager(private val reactContext: ReactApplicationContext) : SimpleViewManager<FrameLayout>() {

    override fun getName(): String = "NativeAdsFragment"

    override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
        val container = FrameLayout(reactContext)
        container.id = View.generateViewId()
        return container
    }

    @ReactProp(name = "adId")
    fun setAdId(view: FrameLayout, adId: String?) {
        val activity = reactContext.currentActivity as? FragmentActivity ?: return
        val fragmentManager = activity.supportFragmentManager
        val fragment = fragmentManager.findFragmentById(view.id) as? NativeAdsFragment

        if (fragment == null) {
            val newFragment = NativeAdsFragment()
            newFragment.setAdId(adId)
            fragmentManager.beginTransaction()
                .replace(view.id, newFragment)
                .commitNowAllowingStateLoss()
        } else {
            fragment.setAdId(adId)
        }
    }
}