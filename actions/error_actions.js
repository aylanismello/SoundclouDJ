export const ErrorConstants = {
	RECEIVE_ERROR: 'RECEIVE_ERROR'
}

export const receiveError = error => {
  return {
    type: ErrorConstants.RECEIVE_ERROR,
    error
  };
}
