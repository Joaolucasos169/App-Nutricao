# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


# App-Nutricao

# BACKEND (executar dentro da pasta backend)
npm install express mongoose bcryptjs jsonwebtoken cors cookie-parser express-mongo-sanitize helmet xss-clean express-rate-limit hpp dotenv
npm install --save-dev nodemon

# FRONTEND MOBILE (executar dentro da pasta mobile)
# Dependências principais
npm install axios @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage react-hook-form

# Dependências do Expo (se usou Expo)
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

# Dependências opcionais úteis
npm install react-native-vector-icons react-native-responsive-fontsize
npm install formik yup  # Para validação de formulários
npm install moment  # Para manipulação de datas

# Para desenvolvimento (devDependencies)
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier