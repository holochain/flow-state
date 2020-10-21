use hdk3::{hash_path::path::Component, prelude::*};
pub mod handlers;

/// The actual project data that is saved into the DHT
/// This is the data that can change.
#[hdk_entry(id = "project_entry")]
#[derive(Debug)]
pub struct ProjectEntry {
    uuid: String,
    name: String,
    preview: String,
    short_story: String,
    long_story: String,
    people: Vec<String>,
    parent: String,
}

/// A channel is consists of the category it belongs to
/// and a unique id
#[derive(Debug, Clone, Serialize, Deserialize, SerializedBytes)]
pub struct Project {
    uuid: String,
    name: String,
    preview: String,
    short_story: String,
    long_story: String,
    people: Vec<String>,
    parent: String,
    entry_hash: EntryHash,
}

/// Input to the list projects call
#[derive(Serialize, Deserialize, SerializedBytes)]
pub struct ProjectListInput {
    parent: String,
}

/// The projects returned from list projects
#[derive(Serialize, Deserialize, SerializedBytes, derive_more::From)]
pub struct ProjectList {
    projects: Vec<Project>,
}

impl Project {
    pub fn new(entry_hash: EntryHash, entry: ProjectEntry) -> FlowStateResult<Project> {
        Ok(Project{
            uuid: entry.uuid,
            name: entry.name,
            preview: entry.preview,
            short_story: entry.short_story,
            long_story: entry.long_story,
            people: entry.people,
            parent: entry.parent,
            entry_hash: entry_hash,
        })
    }
} 