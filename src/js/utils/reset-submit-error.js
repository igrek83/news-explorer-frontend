export default function resetSubmitError() {
  document.querySelector('#authError').classList.remove('visibility');
  document.querySelector('#authError').textContent = "";
  document.querySelector('#autharizationError').classList.remove('visibility');
  document.querySelector('#autharizationError').textContent = "";
}