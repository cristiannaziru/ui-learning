/*
    Feed classes
*/

class Feed {
  constructor(type, title, description) {
    this.type = type;
    this.title = title;
    this.description = description;
  }
}

class NewsType extends Feed {
  constructor(type, title, description, category, region, archived) {
    super(type, title, description);
    this.category = category;
    this.region = region;
    this.archived = archived;
  }
}

class EventType extends Feed {
  constructor(type, title, description, date, location, duration, launched) {
    super(type, title, description);
    this.date = date;
    this.location = location;
    this.duration = duration;
    this.launched = launched;
  }
}

/* 
    Defining HTML elements as global scope variables
*/

const newsToggle = document.getElementById("newsToggle");
const eventToggle = document.getElementById("eventToggle");
const createNews = document.getElementById("createNews");
const createEvent = document.getElementById("createEvent");

let createFeedType = "news";
let all_feed = [];
let news_feed = [];
let events_feed = [];
const FEED_TYPE = {
  all: "all",
  news: "news",
  event: "event"
};
const BASE_URL = "http://172.22.13.38:1323";
const BASE_USER = "5d6e584284d3303e1d5ec96b";

const toggleFeedType = type => {
  let newsField = document.getElementById("newsField");
  let eventField = document.getElementById("eventField");
  type == FEED_TYPE.news
    ? ((newsToggle.style.backgroundColor = "#007bff"),
      (eventToggle.style.backgroundColor = "white"),
      (createFeedType = FEED_TYPE.news),
      (newsField.style.display = "block"),
      (eventField.style.display = "none"),
      toggleCreateButton(FEED_TYPE.news))
    : ((newsToggle.style.backgroundColor = "white"),
      (eventToggle.style.backgroundColor = "#17a2b8"),
      (createFeedType = FEED_TYPE.event),
      (newsField.style.display = "none"),
      (eventField.style.display = "block"),
      toggleCreateButton(FEED_TYPE.event));
};

const toggleCreateButton = type => {
  type == FEED_TYPE.news
    ? ((createNews.style.display = "inline-block"),
      (createEvent.style.display = "none"))
    : ((createNews.style.display = "none"),
      (createEvent.style.display = "inline-block"));
};

const deleteEntry = async (id, type) => {
  try {
    const response = await axios.delete(`${BASE_URL}/feeds/${id}`);
    if (response.status == 200) {
      const feedFilter = document.getElementById("feedDropDown");
      all_feed = all_feed.filter(elem => elem.id !== id);
      type == FEED_TYPE.news
        ? (news_feed = news_feed.filter(elem => elem.id !== id))
        : (events_feed = events_feed.filter(elem => elem.id !== id));
      populateFeed(feedFilter.value);
    }
  } catch (e) {
    console.error(e);
  }
};
const createHtml = elem => {
  if (elem.type == FEED_TYPE.news) {
    return `
    <div class="card text-white bg-primary mb-3" style="max-width: 35rem; min-width: 35rem">
      <div>
        <button class="deleteFeed" 
                onclick="deleteEntry('${elem.id}', '${elem.type}')">x</button>
      </div>
      <div class="card-body">
        <h5 class="card-title">${elem.title}</h5>
        <p class="news-category">Category: ${elem.category}</p>
        <p class="news-region">Region: ${elem.region}</p>
        <p class="news-archived">${
          elem.archived
            ? "This is an archived post!"
            : "This post is not archived!"
        }</p>
        <p class="card-text">${elem.description}.</p>
      </div>
    </div>`;
  } else {
    return `
    <div class="card text-white bg-info mb-3" style="max-width: 35rem; min-width: 35rem">
      <div>
        <button class="deleteFeed" onclick="deleteEntry(
          '${elem.id}', 
          '${elem.type}')">x</button>
      </div>
      <div class="card-body">
        <h5 class="card-title">${elem.title}</h5>
        <p class="event-date">${elem.date} at 
          <a href="">${elem.location}</a>
        </p>
        <p class="event-duration">Duration: 
          ${
            elem.duration > 1
              ? elem.duration + " hours"
              : elem.duration + " hour"
          }
        </p>
        <p class="event-launched">${
          elem.launched
            ? "The event was launched!"
            : "The event was not launched yet!"
        }</p>
        <p class="card-text">${elem.description}.</p>
      </div>
    </div>`;
  }
};
const createPost = async () => {
  // Defining the form fields in order to get their values and reset them afterwards
  let postTitle = document.getElementById("postTitle");
  let postDesc = document.getElementById("postDescription");
  let postRegion = document.getElementById("postRegion");
  let postCategory = document.getElementById("postCategory");
  let postIsArchived = document.getElementById("isArchived");
  let postLocation = document.getElementById("postLocation");
  let postDate = document.getElementById("postDate");
  let postDuration = document.getElementById("postDuration");
  let postIsLaunched = document.getElementById("isLaunched");
  const feedBody = document.getElementById("feedBody");
  const feedFilter = document.getElementById("feedDropDown");

  if (createFeedType == FEED_TYPE.news) {
    const body = new NewsType(
      createFeedType,
      postTitle.value,
      postDesc.value,
      postRegion.value,
      postCategory.value,
      postIsArchived.checked
    );
    try {
      const response = await axios.post(`${BASE_URL}/feeds/${BASE_USER}`, body);
      console.log(response.data);
      news_feed.push(response.data);

      // Removing old data
      postTitle.value = "";
      postDesc.value = "";
      postRegion.value = "";
      postCategory.value = "General";
      postIsArchived.checked = false;

      // Automatically add new post if we're on correct filter;
      feedFilter.value == FEED_TYPE.news || feedFilter.value == FEED_TYPE.all
        ? feedBody.insertAdjacentHTML("afterbegin", createHtml(response.data))
        : null;
    } catch (e) {
      console.error(e);
    }
  } else {
    const body = new EventType(
      createFeedType,
      postTitle.value,
      postDesc.value,
      postDate.value,
      postLocation.value,
      parseInt(postDuration.value),
      postIsLaunched.checked
    );
    try {
      const response = await axios.post(`${BASE_URL}/feeds/${BASE_USER}`, body);
      events_feed.push(response.data);

      // Removing old data
      postTitle.value = "";
      postDesc.value = "";
      postLocation.value = "";
      postDate.value = null;
      postDuration.value = null;
      postIsLaunched.checked = false;

      // Automatically add new post if we're on correct filter;
      feedFilter.value == FEED_TYPE.event || feedFilter.value == FEED_TYPE.all
        ? feedBody.insertAdjacentHTML("afterbegin", createHtml(response.data))
        : null;
    } catch (e) {
      console.error(e);
    }
  }
};

const getFeed = async () => {
  all_feed = [];
  news_feed = [];
  events_feed = [];
  try {
    const response = await axios.get(`${BASE_URL}/feeds/${BASE_USER}`);
    console.log(response.data);
    all_feed = response.data;
    response.data.map(elem => {
      elem.type == FEED_TYPE.news
        ? news_feed.push(elem)
        : elem.type == FEED_TYPE.event
        ? events_feed.push(elem)
        : console.warn(
            `Receiving feed that's neither news or events, instead they are: ${elem.type}`
          );
    });
  } catch (e) {
    console.error(e);
  }
};

const getAndPopulateFeed = async type => {
  await getFeed();
  populateFeed(type);
};

const populateFeed = type => {
  const feedBody = document.getElementById("feedBody");
  feedBody.innerHTML = "";
  switch (type) {
    case FEED_TYPE.all: {
      all_feed.map(elem => {
        feedBody.insertAdjacentHTML("beforeend", createHtml(elem));
      });
      break;
    }
    case FEED_TYPE.news: {
      news_feed.map(elem => {
        feedBody.insertAdjacentHTML("beforeend", createHtml(elem));
      });
      break;
    }
    case FEED_TYPE.event: {
      events_feed.map(elem => {
        feedBody.insertAdjacentHTML("beforeend", createHtml(elem));
      });
    }
  }
};

const toggleCreateForm = turnOn => {
  const createForm = document.getElementsByClassName("feedHeader")[0];
  const showForm = document.getElementById("showForm");
  const hideForm = document.getElementById("hideForm");
  turnOn
    ? ((createForm.style.display = "inline-block"),
      (showForm.style.display = "none"),
      (hideForm.style.display = "inline-block"))
    : ((createForm.style.display = "none"),
      (showForm.style.display = "inline-block"),
      (hideForm.style.display = "none"));
};
getAndPopulateFeed("all");
