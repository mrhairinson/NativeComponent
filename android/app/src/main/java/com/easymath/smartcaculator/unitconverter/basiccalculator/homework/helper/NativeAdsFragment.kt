package com.easymath.smartcaculator.unitconverter.basiccalculator.homework.helper

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.Fragment
import com.easymath.smartcalculator.unitconverter.basiccalculator.homework.helper.R
import com.google.android.gms.ads.AdLoader
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.nativead.NativeAd
import com.google.android.gms.ads.nativead.NativeAdView

class NativeAdsFragment : Fragment() {

    private var adId: String? = null
    private var onAdLoadedCallback: ((Boolean) -> Unit)? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        loadNativeAd()
        return inflater.inflate(R.layout.fragment_native_ads, container, false)
    }

    fun setAdId(adId: String?) {
        this.adId = adId
        // log here
        Log.i("NativeAdsFragment", "Ad ID: $adId")
    }

    fun setOnAdLoadedCallback(callback: (Boolean) -> Unit) {
        onAdLoadedCallback = callback
    }

    public fun loadNativeAd() {
        Log.i("NativeAdsFragment", "Loading native ad...")
        val rootView = view ?: return
        Log.i("NativeAdsFragment", "Root view: $rootView")
        val adContainer = rootView.findViewById<FrameLayout>(R.id.ad_container)
        Log.i("NativeAdsFragment", "Ad container: $adContainer")
        if (adId == null) return
        Log.i("NativeAdsFragment", "Ad ID: $adId")

        val adLoader = AdLoader.Builder(requireContext(), adId!!)
            .forNativeAd { nativeAd ->
                Log.i("NativeAdsFragment", "Native ad loaded")
                val adView = layoutInflater.inflate(R.layout.native_ad_view, adContainer, false) as NativeAdView
                populateNativeAdView(nativeAd, adView)
                adContainer.removeAllViews()
                adContainer.addView(adView)
                Log.i("NativeAdsFragment", "Native ad added to container")

                // Notify React Native callback for success
                onAdLoadedCallback?.invoke(true)
            }
            .withAdListener(object : com.google.android.gms.ads.AdListener() {
                override fun onAdFailedToLoad(error: com.google.android.gms.ads.LoadAdError) {
                    Log.e("NativeAdsFragment", "Failed to load native ad: ${error.message}")
                    // log detail error
                    Log.e("NativeAdsFragment", "Error code: ${error.code}")
                    Log.e("NativeAdsFragment", "Error domain: ${error.domain}")
                    Log.e("NativeAdsFragment", "Error cause: ${error.cause}")

                    // Notify React Native callback for failure
                    onAdLoadedCallback?.invoke(false)
                }
            })
            .build()

        adLoader.loadAd(AdRequest.Builder().build())
    }

    private fun populateNativeAdView(nativeAd: NativeAd, adView: NativeAdView) {
        adView.mediaView = adView.findViewById(R.id.ad_media)
        adView.headlineView = adView.findViewById(R.id.ad_headline)

        (adView.headlineView as? android.widget.TextView)?.text = nativeAd.headline
        adView.setNativeAd(nativeAd)
    }
}