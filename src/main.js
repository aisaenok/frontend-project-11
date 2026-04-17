import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="container-lg mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="display-3 mb-3">RSS aggregator</h1>
        <p class="lead mb-4">Start reading RSS today! It is easy, it is beautiful.</p>

        <form class="rss-form border rounded-3 p-4 bg-light">
          <div class="row g-2">
            <div class="col">
              <input
                type="text"
                class="form-control form-control-lg"
                name="url"
                placeholder="RSS link"
                aria-label="RSS link"
                autocomplete="off"
                required
              />
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary btn-lg px-5">
                Add
              </button>
            </div>
          </div>

          <p class="form-text text-muted mt-2 mb-0">
            Example: https://lorem-rss.hexlet.app/feed
          </p>

          <div class="feedback mt-2"></div>
        </form>

        <div class="feeds mt-5"></div>
        <div class="posts mt-5"></div>
      </div>
    </div>
  </div>
`
