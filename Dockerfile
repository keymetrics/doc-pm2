FROM ruby:2.5-alpine

RUN apk add --no-cache --virtual build-dependencies make gcc g++ python build-base git
RUN gem install pygments.rb jekyll --no-rdoc --no-ri

ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

WORKDIR /docs

ADD Gemfile /docs

RUN bundle install

ADD . /docs
RUN bundle exec jekyll build

FROM kyma/docker-nginx

RUN mkdir -p /var/www/doc/
COPY --from=0 /docs/docs /var/www/doc
EXPOSE 80

CMD 'nginx'
