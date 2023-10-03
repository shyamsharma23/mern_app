FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# ENV PORT=4000 MONGO_URI="mongodb+srv://shyam:piku1234@cluster0.b741l.mongodb.net/?retryWrites=true&w=majority"
EXPOSE 4000
CMD [ "npm","run","server" ]