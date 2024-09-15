import { addMentee, getMentee, getMentees } from "./mentee.controller"
import { addMentor, getMentor, getMentors } from "./mentor.controller"
import { getRepos, getUniqueTechStacks } from "./repo.controller"

export { addMentee as v1AddMentee, getMentee as v1GetMentee, getMentees as v1GetMentees }
export { addMentor as v1AddMentor, getMentor as v1GetMentor, getMentors as v1GetMentors }
export { getRepos as v1GetRepos, getUniqueTechStacks as v1GetTechStacks }
