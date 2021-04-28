import Router from 'next/router';

export async function authHandler(fn) {
  const response = await fn();
  if (response?.error || response?.status > 299) {
    console.log('⛔️ authHandler, Error', response?.error.message);
    return { error: response.error, status: response?.status };
  }

  if (response?.data || response?.status < 300) {
    console.log('✅ authHandler, Success', response);
    return response;
  }
}

export async function responseHandler(response, res) {
  if (!response?.status > 299) {
    throw new Error('must provide a valid response to process');
  }
  if (response?.error) {
    res.status(response?.status ?? 400).json(response);
  }
  res.status(response?.status ?? 200).json(response);
}

export function handlePromises(promises = []) {
  return Promise.all(promises)
    .then((responses) => {
      console.log(responses);
      return responses;
    })
    .catch((error) =>
      console.log(`handlePromises Error in promise ${JSON.stringify(error)}`)
    );
}

// @SCOPE:  used for client-side response handling // unused

// @TODO: create boolean option to use response and redirect to newly created item using the new id
export const handleResponseRedirect = ({
  response,
  origin = '@response-redirect',
  destination = '/auth/signin',
  data,
  error,
  message, // @TODO: implement custom message
}) => {
  // @SCOPE:  used to offload reponse redirection responsibilities with toast support, console.logs
  if (process.browser) {
    if (response?.status > 299) {
      console.log(
        '🚀 ~ file: response-redirect.js ~ line 20 ~ error || response?.error',
        error || response?.error,
        response,
        'redirectTo: ',
        destination
      );
      // handle errors
      Router.push(
        `${destination}/?error="@${origin}--${JSON.stringify(
          error || response?.error
        )}"`
      );
      return;
    } else if (response?.status < 300) {
      console.log(
        '🚀 ~ file: response-redirect.js ~ line 26 ~ data || response?.data',
        data || response?.data,
        response.status,
        'redirectTo: ',
        destination
      );
      // handle success
      Router.push(
        `${destination}/${
          data[0]?.id && data[0].id
        }?success="@${origin}--${JSON.stringify({
          data: data || response?.data,
        })}"`
      );
      return;
    }
  }
};
