  <!-- <div class="prev-work">
    <h3>Some previous work</h3>
    <div class="item-container">
      {% assign projects = site.portfolio | where: 'featured', 'true' | sort: 'coolness' | slice: 0, 4 %}
      {% for item in projects %}
        {% include portfolio-item.html item=item landing=true %}
      {% endfor %}
    </div>
    <!--/ .item-container --
    <a href="portfolio" class="more">See more</a>
  </div>

  <div class="about">
    <p>I grew up running in the pastel, desert mountains on Colorado's Western Slope. Upon graduating from high school, I attended the University of Colorado Boulder on an track & field scholarship. In a CU uniform, I earned an All-Big 12 in the 800m run and graduated as one of the top-10 fastest performers in school history.<p>      
    <p>I still run a bit. Some people think it's a lot, but they don't realize how much we were running back in those days.</p>    
  </div>

  <div class="reviews">
      <p>Journalists learn to develop a thick skin against the unkind words that are all too often thrown at them. But here are some kind words that other people have said about me:</p>
      <ul>
        {% for quote in site.data.reviews %}
          <li>
            <span class="quote">"{{ quote.text }}"</span>
            <span class="quote-source">&mdash;&nbsp;<em>{{ quote.src }}</em></span>
          </li>
        {% endfor %}
      </ul>    
  </div> -->