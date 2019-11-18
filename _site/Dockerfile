# Useful notes from base image
# - JEKYLL_DATA_DIR == /svr/jekyll
# - WORKDIR is /srv/jekyll
FROM jekyll/builder:3

ADD --chown=jekyll:jekyll . ${JEKYLL_DATA_DIR}

RUN gem install bundler

RUN bundle install
