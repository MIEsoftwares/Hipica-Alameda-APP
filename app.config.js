export default {
    expo: {
      name: "Hipica-Alameda-App",
      slug: "Hipica-Alameda-App",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./src/assets/images/Logo2.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./src/assets/images/Logo1-splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./src/assets/images/Logo2.png",
          backgroundColor: "#ffffff",
        },
        package: "com.mockjk.HipicaAlamedaApp",
      },
      extra: {
      eas: {
        "projectId": "8d66abac-6977-4c54-929c-1d97d2667dc2"
      },
    },
      plugins: [
        [
          "expo-build-properties",
          {
            android: {
              minSdkVersion: 24,
            },
          },
        ],
      ],
    },
  };