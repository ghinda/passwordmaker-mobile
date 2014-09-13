# [![](app/images/icons/passwordmaker-mobile-icon-48.png?raw=true) PasswordMaker for FirefoxOS](https://marketplace.firefox.com/app/passwordmaker)

PasswordMaker creates unique, secure passwords that are very easy for you to retrieve but no one else. Nothing is stored online anywhere, anytime, so there's nothing to be hacked, lost, or stolen.

Since FirefoxOS doesn't support copy/paste yet, you can display the generated password as a notification that you can copy manually.

Based on [http://www.passwordmaker.org/](http://www.passwordmaker.org/).

![](artwork/screenshot-generator.png?raw=true)
![](artwork/screenshot-profile-edit.png?raw=true)

## Development

PasswordMaker is built with AngularJS, and [Building Blocks](http://buildingfirefoxos.com/building-blocks/). It uses Grunt to do things.

All data is stored on the device with [localForage](https://github.com/mozilla/localForage).

Run the app in development mode with:

```
  grunt server
```

Create the final build and make a `zip` archive with it with:

```
  grunt
```

## License

This projected is licensed under the terms of the MIT license.
