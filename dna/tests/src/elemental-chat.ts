import { Config } from '@holochain/tryorama'
import * as _ from 'lodash'
import { v4 as uuidv4 } from "uuid";

const delay = ms => new Promise(r => setTimeout(r, ms))

// Configure a conductor with two identical DNAs,
// differentiated by UUID, nicknamed "alice" and "bobbo"
const config = Config.gen({
  alice: Config.dna("../flowstate.dna.gz", null),
  bobbo: Config.dna("../flowstate.dna.gz", null),
})

module.exports = (orchestrator) => {

  orchestrator.registerScenario('Create a project', async (s, t) => {
    // spawn the conductor process
    const { conductor } = await s.players({ conductor: config })
    await conductor.spawn()

    // Create a project
    const project = await conductor.call('alice', 'flowstate', 'create_project', { uuid: uuidv4(), name: "Test Project 1", preview: "", short_story: "", long_story: "", people: [], parent: "aad9e8b3-4889-4cb4-ad70-3da65fe6ce49" });
    console.log(project);
  })

  orchestrator.registerScenario('Create, then list projects', async (s, t) => {
    // spawn the conductor process
    const { conductor } = await s.players({ conductor: config })
    await conductor.spawn()

    // Create a project
    const project1 = await conductor.call('alice', 'flowstate', 'create_project', { uuid: uuidv4(), name: "Test Project 1", preview: "", short_story: "", long_story: "", people: [], parent: "aad9e8b3-4889-4cb4-ad70-3da65fe6ce49" });
    const project2 = await conductor.call('alice', 'flowstate', 'create_project', { uuid: uuidv4(), name: "Test Project 2", preview: "", short_story: "", long_story: "", people: [], parent: "aad9e8b3-4889-4cb4-ad70-3da65fe6ce49" });
    console.log(project1);
    console.log(project2);

    const projectList = await conductor.call('alice', 'flowstate', 'list_projects', { parent: "aad9e8b3-4889-4cb4-ad70-3da65fe6ce49" });
    console.log(projectList);

  })
}
