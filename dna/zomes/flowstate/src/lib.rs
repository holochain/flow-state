use entries::project;
use error::FlowStateResult;
use hdk3::prelude::Path;
use hdk3::prelude::*;
use project::{ProjectEntry, Project, ProjectListInput, ProjectList};

mod entries;
mod error;

entry_defs![Path::entry_def(), ProjectEntry::entry_def()];

#[hdk_extern]
fn create_project(project_entry: ProjectEntry) -> FlowStateResult<Project> {
    project::handlers::create_project(project_entry)
}

#[hdk_extern]
fn list_projects(parent: ProjectListInput) -> FlowStateResult<ProjectList> {
    project::handlers::list_projects(parent)
}
