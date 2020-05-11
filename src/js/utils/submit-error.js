export default function submitError(err) {
  document.querySelector('#authError').classList.add('visibility');
  document.querySelector('#authError').textContent = err;
}
