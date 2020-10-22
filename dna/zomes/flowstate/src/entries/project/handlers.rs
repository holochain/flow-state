use crate::{
    error::FlowStateResult,
    project::{Project, ProjectEntry}
};
use hdk3::prelude::*;

use super::{ProjectListInput, ProjectList};

/// Create a new project
pub(crate) fn create_project(project_entry: ProjectEntry) -> FlowStateResult<Project> {
    let ProjectEntry { parent, uuid, .. } = project_entry.clone();
    
    // Create the path of the project from the Portfolio (parent) uuid
    let path: Path = Path::from(format!("{}.{}", parent, uuid));
    path.ensure()?;

    // Commit the project entry
    create_entry!(&project_entry)?;
    let entry_hash = hash_entry!(&project_entry)?;

    // link the project to the path of the parent Portfolio
    let project_link: HeaderHash = create_link!(path.hash()?, entry_hash.clone())?;

    // Return the project to the UI
    Project::new(project_entry, entry_hash, project_link)
}

/// Create a new project
pub(crate) fn delete_project(project_link: DeleteLinkInput) -> FlowStateResult<HeaderHash> {
    Ok(delete_link!(project_link.into_inner())?)
}

pub(crate) fn list_projects(input: ProjectListInput) -> FlowStateResult<ProjectList> {
    debug!("list_projects")?;
    // Get the portfolio path
    let portfolio_path = Path::from(input.parent);
    let project_path_links = portfolio_path.children()?.into_inner();
    let mut projects = Vec::with_capacity(project_path_links.len());
    for project_uuid in project_path_links.into_iter().map(|link| link.target) {
        if let Some(project_link_last) = get_links!(project_uuid)?.into_inner().last() {
            if let Some(element) = get!(project_link_last.target.clone())? {
                if let Some(project) = element.into_inner().1.to_app_option::<ProjectEntry>()? {
                    projects.push(Project::new(project.clone(), hash_entry!(&project)?, project_link_last)?);
                }
            }
        }
    }
    // Return all the projects data to the UI
    Ok(projects.into())
}
