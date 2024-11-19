package com.easymath.smartcaculator.unitconverter.basiccalculator.homework.helper

import android.os.Bundle
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
        return inflater.inflate(R.layout.fragment_native_ads, container, false)
    }

    fun setAdId(adId: String?) {
        this.adId = adId
        loadNativeAd()
    }

    fun setOnAdLoadedCallback(callback: (Boolean) -> Unit) {
        onAdLoadedCallback = callback
    }

    private fun loadNativeAd() {
        val rootView = view ?: return
        val adContainer = rootView.findViewById<FrameLayout>(R.id.ad_container)

        if (adId == null) return

        val adLoader = AdLoader.Builder(requireContext(), adId!!)
            .forNativeAd { nativeAd ->
                val adView = layoutInflater.inflate(R.layout.native_ad_view, adContainer, false) as NativeAdView
                populateNativeAdView(nativeAd, adView)
                adContainer.removeAllViews()
                adContainer.addView(adView)

                // Notify React Native callback for success
                onAdLoadedCallback?.invoke(true)
            }
            .withAdListener(object : com.google.android.gms.ads.AdListener() {
                override fun onAdFailedToLoad(error: com.google.android.gms.ads.LoadAdError) {
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