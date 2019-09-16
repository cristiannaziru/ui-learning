class Feed {
  constructor(type, title, description) {
    this.type = type;
    this.title = title;
    this.description = description;
  }
}

class News extends Feed {
  constructor(type, title, description, category, region, archived) {
    super(type, title, description);
    this.category = category;
    this.region = region;
    this.archived = archived;
  }
}

class Event extends Feed {
  constructor(type, title, description, date, location, duration, launched) {
    super(type, title, description);
    this.date = date;
    this.location = location;
    this.duration = duration;
    this.launched = launched;
  }
}
