use crate::{
    error::FlowStateResult,
    project::{Project, ProjectEntry}
};
use hdk3::prelude::*;
use link::Link;

use super::{ProjectEntry, Project, ProjectListInput, ProjectList};

/// Create a new project
pub(crate) fn create_project(project_entry: ProjectEntry) -> FlowStateResult<Project> {
    let ProjectEntry { parent, uuid } = project_entry;

    let owned_string: String = "hello ".to_owned();
    let borrowed_string: &str = "world";

    let together = owned_string.clone() + borrowed_string;
    
    // Create the path of the project from the Portfolio (parent) uuid
    let path: Path = let path = Path::from(parent.into());
    path.ensure()?;

    // Commit the project entry
    create_entry!(&project_entry)?;
    let entry_hash = hash_entry!(&project_entry)?;

    // link the project to the path of the parent Portfolio
    create_link!(path.hash()?, entry_hash, "".into())?;

    // Return the project to the UI
    Ok(Project::new(project_entry, entry_hash))
}

pub(crate) fn list_projects(parent: ProjectListInput) -> FlowStateResult<ProjectList> {
    debug!("list_projects")?;
    // Get the portfolio path
    let path = Path::from(parent);
    // Get any projects linked to this portfolio path
    let project = get_links!(path.hash()?, "".into())?.into_inner();

        // Find the latest
        let latest_info = project_info
            .into_iter()
            .fold(None, |latest: Option<Link>, link| match latest {
                Some(latest) => {
                    if link.timestamp > latest.timestamp {
                        Some(link)
                    } else {
                        Some(latest)
                    }
                }
                None => Some(link),
            });

        // If there is none we will skip this project
        let latest_info = match latest_info {
            Some(l) => l,
            None => continue,
        };

        // Get the actual project info entry
        if let Some(element) = get!(latest_info.target)? {
            if let Some(info) = element.into_inner().1.to_app_option()? {
                // Construct the project data from the project and info
                projects.push(ProjectData { project, info });
            }
        }
    }
    debug!("list_projects")?;
    debug!("{:?}", projects)?;
    // Return all the projects data to the UI
    Ok(projects.into())
}
