FROM ruby:2.5-alpine

RUN apk add --no-cache --virtual build-dependencies make gcc g++ python build-base git cmake
RUN gem install pygments.rb jekyll

ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

WORKDIR /docs

ADD Gemfile /docs
ADD Gemfile.lock /docs

RUN bundle install

ADD . /docs
RUN bundle exec jekyll build

FROM kyma/docker-nginx

RUN mkdir -p /var/www
COPY --from=0 /docs/docs /var/www
EXPOSE 80

CMD 'nginx'
