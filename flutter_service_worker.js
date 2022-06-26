'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "a29e8b22a08aa0274b027931eec216c4",
"extends/avatar_mob.png": "14cebde98b2c12b2bc9b5654980cc7ed",
"extends/potrait_web.png": "d233cfbbd27bf877dd6b92f3464ce577",
"extends/misc/mytimor_privacy.html": "52fce3b5f0a346533092a43fbdddb5b1",
"extends/projects/elibrary_img_8.png": "8de74943e491214b5098b6be3ce14353",
"extends/projects/mytimor_merchant_banner.png": "2dd0c10c7367669bfbbd88611e7e9f03",
"extends/projects/musica.png": "5694fbe1b67671750f7d4d58d8aa11a9",
"extends/projects/nutrizer_banner.png": "73c56aeda8aa9a00eef2c9fb3927b801",
"extends/projects/geraisdm.png": "c3e6970536ea9f75141f8e65c4549115",
"extends/projects/elibrary_banner.jpg": "81e6e40274f51665765b875b76e97579",
"extends/projects/mytimor_img_3.png": "c237a539a2e8d6c5de18722b01a66325",
"extends/projects/elibrary.png": "e841086886f3d3f2ef5efb486a07d4ca",
"extends/projects/mytimor_driver_banner.png": "aeb3395ab94a75531cb58a4904c16fd1",
"extends/projects/mytimor_img_2.png": "b35f5264f7246274c766777e577e0fa8",
"extends/projects/mytimor.png": "df9722768f10d1346ed53fa26cc22917",
"extends/projects/mytimor_banner.jpg": "d74884be7e5034d0859f58c503d4c1ff",
"extends/projects/mytimor_img_1.png": "559256fba9f45e00e5eae695083a5bdb",
"extends/projects/elibrary_img_7.png": "29f932b8f0faf72d7a9b6c7db32dc7de",
"extends/projects/musica_banner.png": "bc880298b50fd63e221e3f9184385f21",
"extends/projects/sentuhassetku_banner.jpg": "d73f334ab9a3444f5aaf832c223da52e",
"extends/projects/elibrary_img_6.png": "462207d959610436a993907ad1f35d80",
"extends/projects/sentuhassetku.png": "ad01d084ab481494901b2d0ccbb8eadf",
"extends/projects/elibrary_img_4.png": "553b0d29cec1cd196009cf25d0c41bf6",
"extends/projects/sribuu.png": "0ac819363fb61528a44fbba864bb70f5",
"extends/projects/elibrary_img_5.png": "bb23fac9388e26ed437012ec3595eb91",
"extends/projects/elibrary_img_1.png": "a4d33cccea25d072d97307b710919b36",
"extends/projects/geraisdm_banner.png": "97916990898f5480b6f830035b1ded85",
"extends/projects/elibrary_img_2.png": "c2200ae847a93b3aec402f6d82fcb108",
"extends/projects/nutrizer.png": "80cb798236cdf812dad744849bc00614",
"extends/projects/sribuu_banner.png": "fabcbc92fa9ce5b2152fd0be1c5071c4",
"extends/projects/elibrary_img_3.png": "f60efe17198af76f94fdeb64300e57f7",
"extends/logo.png": "2f36319ac7a8906fb255c90a07212692",
"extends/potrait_trans.png": "7c4da006c7501f5b73d77aa94dc49b3a",
"extends/community/pdg.jpg": "38035274a689c4020558b2b583cc7cc7",
"extends/community/unsrihackers.jpg": "be49caf89a468bc7497f2e2819c7efc5",
"extends/community/sribuu.png": "0ac819363fb61528a44fbba864bb70f5",
"extends/services/app.png": "9d2da88edb7f550ef24874b306b4ae12",
"extends/services/open_b.png": "b65517dd1a07922b014409bb8dcb1e81",
"extends/services/rapid.png": "8d3ff9fbdddae77403af46662f011ee8",
"extends/services/fiverr.png": "9d4018924e1f0e983a86e7eaf8a0958b",
"extends/services/blog.png": "5e1cbb2c67e2b8ea9ae4bcce0705d2a4",
"extends/services/open.png": "4a5996597d32b06d91183f0860c29aab",
"extends/services/ui.png": "3cf727247752b730a05f51fe0177036f",
"index.html": "4e7cac84d7429ebe22b0052a54f7b0e3",
"/": "4e7cac84d7429ebe22b0052a54f7b0e3",
"main.dart.js": "ac4b87778eada32d66318589c3d125e0",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/favicon-16x16.png": "32c82e0de5400df7b5f3dc83e726c316",
"icons/favicon.ico": "e1db2d767521c96e873ba301562485f2",
"icons/android-chrome-192x192.png": "c0836549fba559176ddeaca0c502ce2a",
"icons/apple-touch-icon.png": "ddb1c75f2de011b5065d3ef15712d571",
"icons/android-chrome-512x512.png": "bcf476e8680fbda27d1b436ea3487d99",
"icons/site.webmanifest": "053100cb84a50d2ae7f5492f7dd7f25e",
"icons/favicon-32x32.png": "d2901558111f28e1d5bdc9fc73b5ab31",
"manifest.json": "3421cd00e17d6f742428a18cbf45709d",
"assets/AssetManifest.json": "b4788d428e41504a4076b358a5385c32",
"assets/NOTICES": "b07d0f9e7e593f36531885fd11bc1ff2",
"assets/FontManifest.json": "9bdb557c6b2f6cedd7a1dc0d926f5bd0",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_AMS-Regular.ttf": "657a5353a553777e270827bd1630e467",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Script-Regular.ttf": "55d2dcd4778875a53ff09320a85a5296",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size3-Regular.ttf": "e87212c26bb86c21eb028aba2ac53ec3",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Typewriter-Regular.ttf": "87f56927f1ba726ce0591955c8b3b42d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Bold.ttf": "a9c8e437146ef63fcd6fae7cf65ca859",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Bold.ttf": "ad0a28f28f736cf4c121bcb0e719b88a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Bold.ttf": "9eef86c1f9efa78ab93d41a0551948f7",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Regular.ttf": "dede6f2c7dad4402fa205644391b3a94",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Regular.ttf": "5a5766c715ee765aa1398997643f1589",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Italic.ttf": "d89b80e7bdd57d238eeaa80ed9a1013a",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-Italic.ttf": "a7732ecb5840a15be39e1eda377bc21d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-Italic.ttf": "ac3b1882325add4f148f05db8cafd401",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Fraktur-Bold.ttf": "46b41c4de7a936d099575185a94855c4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size2-Regular.ttf": "959972785387fe35f7d47dbfb0385bc4",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_SansSerif-Regular.ttf": "b5f967ed9e4933f1c3165a12fe3436df",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size1-Regular.ttf": "1e6a3368d660edc3a2fbbe72edfeaa85",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Caligraphic-Regular.ttf": "7ec92adfa4fe03eb8e9bfb60813df1fa",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Size4-Regular.ttf": "85554307b465da7eb785fd3ce52ad282",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Main-BoldItalic.ttf": "e3c361ea8d1c215805439ce0941a1c8d",
"assets/packages/flutter_math_fork/lib/katex_fonts/fonts/KaTeX_Math-BoldItalic.ttf": "946a26954ab7fbd7ea78df07795a6cbc",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "dd3c4233029270506ecc994d67785a37",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "613e4cc1af0eb5148b8ce409ad35446d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "d1722d5cf2c7855862f68edb85e31f88",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/placeholder.png": "5cad1c2ab5b441129b9d3edebe0b399b",
"assets/assets/hi.gif": "cad5918d86b6a7e83f1fb4acead70e4c",
"assets/assets/fonts/agustina.otf": "7b9833076716a8d14eec0cf885a3153c",
"assets/assets/fonts/montserrat.ttf": "ee6539921d713482b8ccd4d0d23961bb",
"assets/assets/donut.png": "680c78259b6b1140a32dccea66bd974f",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
