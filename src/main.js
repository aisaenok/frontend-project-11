import './style.css'
import init from './init.js'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container-lg mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="display-3 mb-3">RSS агрегатор</h1>
        <p class="lead mb-4">Начните читать RSS сегодня! Это легко, это красиво.</p>

        <form class="rss-form border rounded-3 p-4 bg-light">
          <div class="row g-2">
            <div class="col">
              <label for="url-input" class="form-label visually-hidden">Ссылка RSS</label>
              <input
                id="url-input"
                name="url"
                type="text"
                class="form-control form-control-lg"
                placeholder="Ссылка RSS"
                aria-label="Ссылка RSS"
                autocomplete="off"
                required
              />
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary btn-lg px-5">
                Добавить
              </button>
            </div>
          </div>

          <p class="form-text text-muted mt-2 mb-0">
            Пример: https://lorem-rss.hexlet.app/feed
          </p>
          <div class="feedback mt-2"></div>
        </form>

        <div class="feeds mt-5"></div>
        <div class="posts mt-5"></div>
      </div>
    </div>
  </div>
`

init()
