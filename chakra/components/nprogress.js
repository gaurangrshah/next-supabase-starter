import Router from "next/router";
import nprogress from "nprogress";
import debounce from "lodash.debounce";

// Only show nprogress after 500ms (slow loading)
const start = debounce(nprogress.start, 500);

Router.events.on("routeChangeStart", start);

Router.events.on("routeChangeComplete", (url) => {
  start.cancel();
  nprogress.done();
  window.scrollTo(0, 0);
});

Router.events.on("routeChangeError", () => {
  start.cancel();
  nprogress.done();
});

const Nprogress = () => (
  <style jsx global>
    {`
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: red;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;

        width: 100%;
        height: 5px;
      }

      /* Fancy blur effect */
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px red, 0 0 5px red;
        opacity: 1;

        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }

      /* Remove these to get rid of the spinner */
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }

      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: red;
        border-left-color: red;
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
      }

      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }

      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }

      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}
  </style>
);

export default Nprogress;
