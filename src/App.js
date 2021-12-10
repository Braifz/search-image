import { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import './header.css';
import './content.css';
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])

  const open = url => window.open(url)
  console.log({photos})
  
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search:"" }}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization':'Client-ID -u6H5wnP5WJWqbM_LP1iQfm8FAzoePDFuUnAFlSoL-A'
              }
            })
            const data = await response.json()
            //get api unsplash
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field placeholder="Search" name="search"/>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description}/>
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
