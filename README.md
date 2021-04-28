# next-supabase-starter
Includes magiclink + email auth

[demo](https://next-supabase-starter.vercel.app/)

register for and create a new [supabase](www.supabase.io) database instance.
- use `.env.sample` as a boilerplate.

- [ ] implement social auth
- [ ] verify token refresh flow
- [ ] update docs



## Integrations



### [Chakra-UI](https://chakra-ui.com/docs/getting-started)



#### Requirements

Chakra UI requires the following packages:

```bash
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```



#### Provider

Chakra UI is exposed to the application via the `ChakraProvider` in `app.js`:

```jsx
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/chakra";

const App = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
```

**NOTE: ** the `ChakraProvider` takes in the custom theme we've defined in the `chakra` directory



#### Theme

The custom theme file extends chakra's default theme with the following custom modules:

- Global Styles: `./chakra/global-styles.js`

  - defines all default styles related to the app, this includes: html, body, and some browser prefixes (such as focus-visible and default scrollbar)



- Color Modes:  `./chakra/color-modes.js`

  - used to define light theme and dark theme colors

  - **NOTE** use the custom hook `use-color` to implement color schemes

  - Usage:

    ```jsx
    import { useColor } from "@/chakra/hooks/use-color";

    export const ErrorTag = ({children, ...rest }) => {

      const { color } = useColor();


      return (
        <Box bg={color("danger")} {...rest}>
          {children}
        </Box>
      )
    }
    ```



- Fonts: `./chakra/fonts.js`

  - defines the custom fonts along with the properties used to reference them with in chakra

    ```js
    export const fonts = {
      heading:
        "'Noto Serif', Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
      body:
        "'Noto Sans', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    };
    ```

  - Usage:

    ```jsx
    <Text fontFamily='body'>
      {lead}
    </Text>
    ```





- layerStyles: `./chakra/layerStyles/bars.js`

  - use to allow themeing for header and footer placeholders in the app scaffold

    🔴 (-- see scaffold section below for more info)



- layouts : `./chakra/layouts`

  - used to expose different layouts if needed in the app -- currently renders the scaffold
  - ☑️ TODO: merge layouts and scaffold components



#### Components

`./chakra/components/*` includes components we've modified based on chakra components and components specifically used by the scaffold.

##### `Alert` -  composes Chakra's alert dialog, used to display confimations messages

- Alert can be used via the `useAlert` hook. (--see `useAlert` for more info)



##### `ErrorTag` - Custom component used by the ErrorContext - to show toast / error messages

- Mainly used to display errors on the front end, gets rendered automatically by the Error Context Provider.
- Can be globally turned off using the options in `./app.config.js`



##### `MD-JSX` - Custom component exposes used to render markdown content

- Uses `textStyles` to override the default styling for all markdown content.
- Provides overrides for all text components (Text, Heading, etc)



##### `ModeToggle` - Custom component used to toggle color modes

- used to switch between light and dark mode on the client side.



##### `ShowJson` - Custom component used to render JSON data in a model

- used for debugging data fetching. renders a button (Show JSON) which present data in a modal when clicked.

- Usage:

  ```jsx
  import { ShowJson } from "@/chakra/components/show-json";

  export const Responser = ({}) => {
  	const [data, setData] = useState(initialData ?? null);

  	useEffect(async () => {
      if (initialData || data) return;
      const response = await fetch(`https:/....`);
      if (response?.data) {
        setData(response?.data);
        logger.success("responser", response?.data);
      } else logger.error("responser");
    }, []);

    return <ShowJson data={data} />;
  }
  ```



##### `Spinner` - Composes chakra's default Spinner component inside of a Flex container

- Instead of using chakra's spinner and worrying about centering it inside of each component this will automatically display centered in any component.



##### `Scaffold` - Custom component used to render and swap out Layouts on the fly

- Scaffold consists of several parts.

  - Scaffod Provider - implements providers for several contexts (Error, Toast, Messenger, ..) (-- see scaffold context for more info)

  - PageGrid - component used to render the page structure creating for placeholders for header, footer and main content area.

  - Placeholders can be populated by defining the component each placeholder should render in `./app.config.js`

  - Each of the place holders are defined in `@chakra/components/structure/bars`

    - This file exposes two components `HeaderComponent` & `FooterComponent`
    - They are used to render the your custom header and footer which you can define in `./app.config.js`

  - USAGE: (how to compose your custom header from `./app.config.js`)

    ```js
    appConfig.scaffold = {
      defaults: {
        header: {
          component: Header,
          props: { HeaderComponent: HeaderContent },
        },
        footer: {
          component: Footer,
          props: { FooterComponent: FooterContent },
        },
      },
      infoBlock: {
        id: "infoblock",
        Component: FooterInfo,
      },
      theme: "default",
    };
    ```




##### `MessageRouter` - used to display success and error messages from redirects

- Component is rendered at the root of the application in `_app.js`

  ```jsx
  import MessageRouter from '@/components/message-router';

  const App = ({ Component, pageProps, router }) => {
  	return (
    	<MessageRouter asPath={router.asPath}>
      	{children}
      </MessageRouter>
    )
  }
  ```



- on any route change you can add the query string:

  ```
  ?error=""
  ?success=""
  ```

  > any message passed along within the strings will be intercepted by the MessageRouter on any redirect event. If the query string includes the keyword "error" then an error notification is shown if it's success a success notification is shown. For any other queries MessageRouter will simply ignore the query and will essentially get bypassed.
  >
  > **NOTE**: You must ensure you're allowing notifications via `app.config.js` options or via localStorage.



##### `Modal` - Use to render modals without the use of context

- Usage:

  ```jsx
  import { useDisclosure } from "@chakra-ui/react";
  import {ChModal} from "@/components/modal"

  const Example = ({children, ...rest}) => {
  	const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <CHModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        hasSubmit={true} // set true if the modal contains a form component
        title={
          <Heading
            as='h1'
            fontSize='5xl'
            textAlign='center'
            color='inherit'
            pt={12}
          >
            Welcome Back!
          </Heading>
        }
      />
    )
  }
  ```





#### Contexts



`./chakra/contexts/index.js`  - composes all contexts into a single `Provider` object that is then consumed and rendered by the `ScaffoldContext`



##### `Error Context`  - used to display error toasts and tag notifications.

- Renders the ErrorTag component to display notifications at the top of the page.

- Manages toast notifications primarily for errors by exposing the `setError` function which can be used from the `useErrorDispatch()` hook

- -- provider rendered via scaffold context

- Usage:

  ```jsx
  import { useErrorDispatch } from "@/chakra/contexts/error-context";

  export const Example = ({ children, ...rest }) => {

    const { setError } = useErrorDispatch();

    const handleSubmit = async (e) => {
      e.preventDefault();
      e.persist();

      const response = await fetch(`http://...`)

      if(response.error) setError(response.error)
    }

    /*...*/
  }
  ```



##### `ModalContext` - used to easily render dyanmic modals (UNUSED)

- used to dynamically render modals with passed in data

- exposed via `useModalDispatch()` hook

- Usage: -- ☑️ to be updated



##### `ScaffoldContext` - used to expose all default providers

- exposes the following providers:  modal, modalForm, sidebar, toasts, errors
- also renders NProgress used as a page loader defined at `./components/nprogress`
- also exposes the `useScaffold()` hook - used to update header/footer and manage options via `./app.config`
- also sets options from `./app.config` to local storage under the key: "options"



##### `ToastContext` - used to display toast messages

- used by `ErrorContext`  under the hood to display error toasts.

- exposes the `useToastDispatch()` hook.

- Usage:

  ```jsx
  import { useToastDispatch } from "@/chakra/contexts/toast-context";

  export const Example = ({children, ...rest}) => {

    const { setMsg } = useToastDispatch();

    setMsg({
      description: parsedMsg,
      position: "bottom-right",
      title: "Error",
      status: "error",
    });

    /*...*/
  }
  ```



#### Hooks

##### `useColor` - used to set colors based on current color mode.

- Usage:

  ```jsx
  import { useColor } from "@/chakra/hooks/use-color";

  export const Example = ({children, ...rest}) => {

    const { color } = useColor();

     return (
      <Box bg={color("bg")}>
        {children}
      </Box>
    );
  }
  ```



##### `useAlert` - used to trigger an alert confirmation dialog

- composes chakra's default Alert component into a reusable modal

- Exposes the Alert component that renders the message dialog and a handleConfirm callback

- use the handleConfirm callback to execute any action after user has confirmed their action in the modal dialog.

- Usage: ☑️ TODO update usage example

  ```jsx

  ```





#### Icons

- Using chakra to compose icons and shapes

- First take the svg icon and convert its path to an object format:

  ```js
  const paths = {
    add: {
      viewBox: "0 0 56 56",
      d: [
        "M46.667 4.667h-28A4.671 4.671 0 0014 9.333v28A4.671 4.671 0 0018.667 	42h28a4.671 4.671 0 004.666-4.667v-28a4.671 4.671 0 00-4.666-4.666zm-28 32.666v-28h28l.004 28H18.667z",
        "M9.333 18.667H4.667v28a4.671 4.671 0 004.666 4.666h28v-4.666h-28v-28zM35 14h-4.667v7h-7v4.667h7v7H35v-7h7V21h-7v-7z",
      ],
    },
  }
  ```

- then use the CustomIcon or CustomShape components (`@/chakra/icons/custom-icon.js`)

- Usage: as standalone icon

  ```jsx
  import { CustomIcon } from "@/chakra/icons/custom-icon";

  export const Example = ({children, ...rest}) => {
    return (
    	<CustomIcon icon='add' color='gray.600' />
    )
  }
  ```

- Usage: as Icon Button

  ```jsx
  import { CustomIcon } from "@/chakra/icons/custom-icon";

  export const Example = ({children, ...rest}) => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    return (
      <IconButton
        type='submit'
        colorScheme='blue'
        aria-label='send email'
        mr={1}
        icon={<CustomIcon icon='plane' color='gray.600' />}
        isLoading={isSubmitting}
       />
    )
  }
  ```

- Usage via ToolIcon component `./@chakra/icons/tool-icon.js`

  ```jsx
  import { CustomIcon } from "@/chakra/icons/custom-icon";

  export const Example = ({children, ...rest}) => {

    const [isLoading, setIsLoading] = useState(false)

    return (
      <IconButton
        isLoading={isLoading}
        isDisabled={isLoading}
        type='submit'
        icon={
          <ToolIcon icon={"disk"} tipLabel={`Update ${unPluralize(tabView)}`} />
        }
        size='lg'
        mr={2}
        mt={-4}
        p={2}
        stroke='gray.100'
      />
    )
  }
  ```



### Framer-Motion

Used for interaction animations also required by chakra for transition components, popovers and modals

- `./components/motion-box.js`

- Usage:

  ```jsx
  import { Box, forwardRef } from "@chakra-ui/react";
  import { motion, isValidMotionProp } from "framer-motion";

  export const MotionBox = motion(
    forwardRef((props, ref) => {
      const chakraProps = Object.fromEntries(
        // NOTE: does not pass framer props to DOM element
        Object.entries(props).filter(([key]) => !isValidMotionProp(key))
      );
      return <Box ref={ref} {...chakraProps} />;
    })
  );
  ```



### focus-visible

Package that adds necessary css prefixes that keeps accessibility in tact while removing the border outlines that browsers natively apply to buttons and links. This package is consumed at the top of the global stylesheet located at `@/chakra/global-styles.js`

```js
import "focus-visible/dist/focus-visible";

export const styles = {
  global: (props) => ({
    ".js-focus-visible": {
      /*
    This will hide the focus indicator if the element receives focus with the mouse, but it will still show up on keyboard focus thus keeping accessibility in tact.
    */
      outline: "none",
      boxShadow: "none",
    },
  }
```



### nprogress

Page loader animation component. Shows a loading indicator at the top of each page, that fires on each route change event. Component is defined in `@/components/nprogress.js`

**NOTE**: requires lodash's debounce method and uses styled-jsx to apply the necessary styles globally.

- ☑️ TODO: add styles for nprogress to global styles.



### App Config

`./app.config.js` is a file located at the root of the project directory. The purpose of this file is to allow for modularity in the application, without having to use global context or redux.

The functionality is still crude and is very much a work in progress.
**NOTE**: this topic is certainly open to discussion and criticism, as it is still in it's infancy.

We'll cover the file in as much detail as needed, the file itself exposes a single module `appConfig`, but is made up of two separate parts.

- App Config - [details, routes, options]
- Scaffold Config - [defaults]
- Also there's a third part not yet implemented for SEO `appConfig.seo`

The first part `App Config` - is used to set some basic details about the app. If you've ever used gatsby this concept is loosely based on the `gatsby-config.js` files used to configure gatsby projects.

```js
const appConfig = {
  details: {
    title: "Falcon Driving School",
    description: "Hudson County's Best Way To Learn How To Drive!",
    siteUrl: process.env.NEXT_PUBLIC_URL,
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL,
  },
  routes: {
    home: "/",
    about: "about",
    services: "services",
    contact: "contact",
  },
  options: {
    toasts: { show: true },
    errors: { show: true, config: { tags: true } },
    tips: { show: false },
  },
};
```

> - `details` - App details include title, description and urls.
> - `routes` -  define all necessary routes for the application - instead of creating a routes file -- (this may not even be necessary in a next.js app and probably can be removed)
> - `options` - sets up the configuration globally for things like error notifications and tooltips -- these options will also be persisted to local storage and can be updated from there giving you app-wide control over when to show or not show certain notifications.
>   - **NOTE**: these could be set up individually based on your environment so you could choose to only show error notifications in development virtually supressing them in production.



The next part `Scaffold Config` is where we can register the components we'd like rendered on each page of our app. This helps us define and customize foundational components like the Header, Footer, and other persistent components.

```js
import { Header, Footer } from "@/chakra/components/structure/bars";
import { HeaderContent } from "@/components/structure/header-content";
import { FooterContent } from "@/components/structure/footer-content";
import { FooterInfo } from "./components/structure/footer-info";

appConfig.scaffold = {
  defaults: {
    header: {
      component: Header,
      props: { HeaderComponent: HeaderContent },
    },
    footer: {
      component: Footer,
      props: { FooterComponent: FooterContent },
    },
  },
  infoBlock: {
    id: "infoblock",
    Component: FooterInfo,
  },
  theme: "default",
};
```

> **NOTE**: there's also the ability to define a theme here, this can be used throughout the application, and can be updated via local storage



The final part is the `SEO Config` which has not been implemented as of yet, and will theoretically allow us to configure the SEO of each individual page on the fly.





### Utils

The starter includes various helper functions meant to make development easier. You can find all the helper functions in the `@/utils` directory. They should be pretty well documented within the comments for each function. If the usage of any is unclear, feel free to do a search with  <kbd>shift</kbd>+<kbd>cmd</kbd>+<kbd>f</kbd> to look for instances used throughout the application.
