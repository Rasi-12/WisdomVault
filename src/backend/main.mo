import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";

actor {
  public type KnowledgeEntry = {
    id : Text;
    title : Text;
    category : Text;
    language : Text;
    region : Text;
    description : Text;
    audioUrl : Text;
    transcription : Text;
    contributorAge : Nat;
    verified : Bool;
  };

  public type ContactSubmission = {
    name : Text;
    emailOrPhone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type ContributionSubmission = {
    id : Text;
    contributorName : Text;
    age : Nat;
    region : Text;
    language : Text;
    transcription : Text;
    category : Text;
    recordingType : Text;
    status : Text;
    submittedAt : Time.Time;
  };

  public type SubmissionFilter = {
    #status : Text;
    #category : Text;
    #region : Text;
    #contributorName : Text;
    #language : Text;
  };

  module KnowledgeEntry {
    public func compare(entry1 : KnowledgeEntry, entry2 : KnowledgeEntry) : Order.Order {
      Text.compare(entry1.title, entry2.title);
    };
  };

  module ContributionSubmission {
    public func compare(sub1 : ContributionSubmission, sub2 : ContributionSubmission) : Order.Order {
      Text.compare(sub1.id, sub2.id);
    };
  };

  let knowledgeEntries = Map.empty<Text, KnowledgeEntry>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let contributionSubmissions = Map.empty<Text, ContributionSubmission>();

  var nextEntryId = 9;
  var nextContributionId = 1;

  // Seed initial knowledge entries (runs once)
  if (knowledgeEntries.isEmpty()) {
    let dummyEntries = [
      {
        id = "entry1";
        title = "Neem Tree Uses";
        category = "Traditional Medicine";
        language = "Tamil";
        region = "South India";
        description = "Neem leaves are used for treating skin conditions and boosting immunity.";
        audioUrl = "";
        transcription = "Neem leaves are used for treating skin conditions and boosting immunity.";
        contributorAge = 65;
        verified = true;
      },
      {
        id = "entry2";
        title = "Turmeric Milk";
        category = "Food Remedies";
        language = "Hindi";
        region = "North India";
        description = "Turmeric mixed with milk is a common remedy for coughs and colds.";
        audioUrl = "";
        transcription = "Turmeric mixed with milk is a common remedy for coughs and colds.";
        contributorAge = 58;
        verified = true;
      },
      {
        id = "entry3";
        title = "Panchatantra Stories";
        category = "Cultural Stories";
        language = "Telugu";
        region = "Andhra Pradesh";
        description = "Ancient fables teaching moral values through animal characters.";
        audioUrl = "";
        transcription = "Ancient fables teaching moral values through animal characters.";
        contributorAge = 70;
        verified = false;
      },
      {
        id = "entry4";
        title = "Crop Rotation";
        category = "Farming Practices";
        language = "Tamil";
        region = "South India";
        description = "Rotating crops helps maintain soil fertility and reduce pests.";
        audioUrl = "";
        transcription = "Rotating crops helps maintain soil fertility and reduce pests.";
        contributorAge = 60;
        verified = true;
      },
      {
        id = "entry5";
        title = "Coconut Oil Benefits";
        category = "Traditional Medicine";
        language = "Tamil";
        region = "Kerala";
        description = "Coconut oil is used for skin care and cooking due to its health benefits.";
        audioUrl = "";
        transcription = "Coconut oil is used for skin care and cooking due to its health benefits.";
        contributorAge = 55;
        verified = true;
      },
      {
        id = "entry6";
        title = "Yogurt Rice Cooling";
        category = "Food Remedies";
        language = "Telugu";
        region = "South India";
        description = "Yogurt mixed with rice is believed to cool the body during summer.";
        audioUrl = "";
        transcription = "Yogurt mixed with rice is believed to cool the body during summer.";
        contributorAge = 62;
        verified = false;
      },
      {
        id = "entry7";
        title = "Jataka Tales";
        category = "Cultural Stories";
        language = "Hindi";
        region = "North India";
        description = "Stories about previous lives of Buddha, teaching moral lessons.";
        audioUrl = "";
        transcription = "Stories about previous lives of Buddha, teaching moral lessons.";
        contributorAge = 68;
        verified = false;
      },
      {
        id = "entry8";
        title = "Organic Manure Use";
        category = "Farming Practices";
        language = "Telugu";
        region = "Andhra Pradesh";
        description = "Using organic manure instead of chemical fertilizers for healthy crops.";
        audioUrl = "";
        transcription = "Using organic manure instead of chemical fertilizers for healthy crops.";
        contributorAge = 59;
        verified = true;
      },
    ];
    for (entry in dummyEntries.values()) {
      knowledgeEntries.add(entry.id, entry);
    };
  };

  // Helper function to generate contribution IDs
  func generateContributionId() : Text {
    let id = "WV-" # nextContributionId.toText();
    nextContributionId += 1;
    id;
  };

  public query ({ caller }) func getAllKnowledgeEntries() : async [KnowledgeEntry] {
    knowledgeEntries.values().toArray().sort();
  };

  public query ({ caller }) func getKnowledgeEntriesByCategory(category : Text) : async [KnowledgeEntry] {
    knowledgeEntries.values().toArray().filter(func(entry) { entry.category == category });
  };

  public query ({ caller }) func getKnowledgeEntryById(id : Text) : async KnowledgeEntry {
    switch (knowledgeEntries.get(id)) {
      case (null) { Runtime.trap("Knowledge entry not found") };
      case (?entry) { entry };
    };
  };

  public query ({ caller }) func searchKnowledgeEntriesByKeyword(keyword : Text) : async [KnowledgeEntry] {
    knowledgeEntries.values().toArray().filter(
      func(entry) {
        entry.title.contains(#text keyword) or entry.description.contains(#text keyword);
      }
    );
  };

  public shared ({ caller }) func submitContactForm(name : Text, emailOrPhone : Text, message : Text) : async () {
    let contact : ContactSubmission = {
      name;
      emailOrPhone;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(Time.now().toText(), contact);
  };

  public shared ({ caller }) func submitContribution(contributorName : Text, age : Nat, region : Text, language : Text, transcription : Text, category : Text, recordingType : Text) : async Text {
    let id = generateContributionId();
    let submission : ContributionSubmission = {
      id;
      contributorName;
      age;
      region;
      language;
      transcription;
      category;
      recordingType;
      status = "pending";
      submittedAt = Time.now();
    };
    contributionSubmissions.add(id, submission);
    id;
  };

  public query ({ caller }) func getContributionById(id : Text) : async ContributionSubmission {
    switch (contributionSubmissions.get(id)) {
      case (null) { Runtime.trap("Contribution not found") };
      case (?contrib) { contrib };
    };
  };

  public query ({ caller }) func filterContributions(filter : SubmissionFilter) : async [ContributionSubmission] {
    contributionSubmissions.values().toArray().filter(
      func(dat) {
        switch (filter) {
          case (#status(status)) { dat.status == status };
          case (#category(category)) { dat.category == category };
          case (#region(region)) { dat.region == region };
          case (#contributorName(name)) { dat.contributorName == name };
          case (#language(language)) { dat.language == language };
        };
      }
    ).sort();
  };
};
