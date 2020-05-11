export default function secondSubmitError(err) {
  document.querySelector('#autharizationError').classList.add('visibility');
  document.querySelector('#autharizationError').textContent = err;
}