import { addMentee, getMentee, getMentees } from "./mentee.controller"
import { addMentor, getMentor, getMentors } from "./mentor.controller"
import { getRepos, getUniqueTechStacks } from "./repo.controller"

export { addMentee as v2AddMentee, getMentee as v2GetMentee, getMentees as v2GetMentees }
export { addMentor as v2AddMentor, getMentor as v2GetMentor, getMentors as v2GetMentors }
export { getRepos as v2GetRepos, getUniqueTechStacks as v2GetTechStacks }
