import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'
import init from './init.js'
import initI18n from './i18n.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container-lg mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="page-title display-3 mb-3"></h1>
        <p class="page-subtitle lead mb-4"></p>

        <form class="rss-form border rounded-3 p-4 bg-light" novalidate>
          <div class="row g-2">
            <div class="col">
              <label for="url-input" class="form-label visually-hidden"></label>
              <input
                id="url-input"
                name="url"
                type="text"
                class="form-control form-control-lg"
                autocomplete="off"
              />
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary btn-lg px-5"></button>
            </div>
          </div>

          <p class="form-text text-muted mt-2 mb-0"></p>
          <div class="feedback mt-2"></div>
        </form>

        <div class="feeds mt-5"></div>
        <div class="posts mt-5"></div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="postModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label=""></button>
        </div>
        <div class="modal-body">
          <p class="modal-description"></p>
        </div>
        <div class="modal-footer">
          <a class="btn btn-primary modal-read-full" href="#" target="_blank" rel="noopener noreferrer"></a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
        </div>
      </div>
    </div>
  </div>
`

let cleanup = null

initI18n().then((i18n) => {
  cleanup = init(i18n)
})

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (cleanup) {
      cleanup()
    }
  })
}
