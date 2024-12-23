package com.easymath.smartcaculator.unitconverter.basiccalculator.homework.helper

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class NativeAdsFragmentPackage:ReactPackage {
    override fun createNativeModules(p0: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf()
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ) = listOf(NativeAdsFragmentManager(reactContext), MyViewManager(reactContext))
}