# Prepclass Developer Guidelines

In this document, we establish a set of principles/guidelines for development within Prepclass, and an accompanying process which is compatible with the principles.

This is a living document: over time, we will update the process to more closely suit what we need discarding what does not work and adding new ideas which we agree to commit to. As such, feel free to send suggestions concerning process to [nonso@prepclassng.com](mailto:nonso@prepclassng.com)

### Principles

---

**Effective Communication**

The key concept behind collaborative development is communication. We should write code with the mind that it is going to be read multiple times, by different people other than the initial committer. The central idea then is that code should be as easy to read as possible without the need for adjoining comments. In general, we rather prefer readable code than static comments explaining the same piece of code. To this end, we suggest the following guidelines:

**Naming.**

Care should be taken when choosing variable and function names so that their use is obvious from their identifiers. If you find yourself having to introduce comments explaining a variable name, or doc comments for a function, think about how you might instead change the name to more explicitly say what you mean. Granted, overly long names make it difficult to fit statements in a single line, a healthy compromise is required between the two, but a multi-line easy-to-read statement is preferred to a short statement which is not obvious. Also, name files and classes appropriately.

**Structure.**

Break things down as far as reasonable.

Rather than have one big function, it is desirable to break down tasks into multiple self descriptive functions. A function that comprises of multiple self descriptive function calls reads more easily than a rather long function doing multiple things.

Emphasis should be on a function's `function'. This means for instance, doing validation in such a way that does not obscure through multiple nesting a function's main function. This can be achieved by judicious use of smaller functions, and negative if statements that return early. Use vertical spacing to delineate different sections of a function.

Take care to use a sensible structure for files also: related code should be in the same file.

**Don't Repeat Yourself.**

If you find yourself having to write the exact snippet of code again, think about refactoring.

Perhaps it is time to introduce an abstraction that concisely represent what you're trying to do. Establishing good abstractions improves readability of code, and further encourages code-reuse.

**Syntactic Guidelines.**

Try to follow the commonly accepted syntactic guidelines within the language you are developing in.

In general for python: install pyflakes and pep8 linters to your IDE

For javascript use: [eslint](http://eslint.org/) using the [StandardJS](https://github.com/feross/standard/) format. No further configuration is needed but you will need to install an [Eslint parser](http://eslint.org/docs/user-guide/integrations) for your editor/IDE

**Outdated code.**

The moment a portion of code becomes unnecessary, delete. In general, we do not tolerate commented out code, if anything needs to be resurrected, we have the version control system for that.

Continuous Improvement

All developers are responsible for the quality of our code, including aspects of code that you might not have written yourself. This means that continuous improvement is expected from developers. Within the course of working with code, it is expected that you make changes that serve the purposes highlighted within this guideline. For instance, if some piece of code is difficult to follow due to length, structure and naming, you are encouraged to fix this and save others the trouble going forward. If you spot code that is no longer needed, you should delete it.

Done goes beyond 'it works'

A feature is done, when the changes introduced addresses the specification of the ticket **and** meet our guidelines.

Process.

Below we describe our collaborative development process.

If you are reading this document, the following is obvious: 1. We use git as our version control system 2. Our central repository is hosted on bitbucket.

In terms of process, we adopt a process roughly similar to git-flow.

Branches:

**master**

This is the branch from which deployment occurs, commits are not made directly to this branch. The HEAD of this branch should always correspond to the state of the deployed code. In general, this branch is not committed to directly, but will be updated during the release process.

**Release branches**

Release branches are created when development of the release is completed on develop branch. They are used to keep track of bug fixes found during normal or beta testing. The release branch should be merged to master when the version goes live on production. Every commit to this branch should be back merged to develop.

The feature branch shall take the following format: release-version, for example release-v1.1.4

**develop**

This corresponds to the current set of features that are ready to be deployed. In general, the development branch shall not be committed to directly, but will be updated via merge request from feature branches.

**Feature branches**

The feature branches are the most important branches within our development system. Features shall be developed independently on feature branches.

_A feature corresponds roughly to a ticket as defined within the ticket system._

Each feature will ideally belong to its own branch, which shall be based off of the 'develop' branch. It is the responsibility of the feature developer to ensure that their branch does not go out of sync with the develop branch (for instance, by periodically pulling in the develop branch into their feature branch).

In the case of features that depend on other features, it might make sense to create the feature branches based on other feature branches. In that case, it is the responsibility of the feature developer to ensure that the feature branch stays up to that with the branches on which it depends.

The feature branch shall take the following format: \[dev_initials\]\_\[feature_title\]\_\[ticket_number\]

- dev_initials: initials of the developer that is responsible for this branch e.g. Chinonso Chukwuogor Obiora will be CCO
- feature_title: An apt title that summarizes the goal of the feature being worked on e.g. mobile_form_redesign
- ticket_number: The ticket number as noted on JIRA

**Hotfix branches**

Hotfix branches shall be created in the event of hotfixes. We describe the hotfix process in the hotfix section, below.

Workflow:

**Feature Development.**

Feature development shall be carried out in feature branches as described above.

As highlighted previously, collaborative development is essentially about communication, to that end, the following guidelines should be followed during feature development: 1. commit frequently with good commit messages. Keeping commits short and the changes related eases the review process. Large unrelated commits are hard to follow. A descriptive commit message summarises the changes made in the commit. 2. periodically push your development branch to the central repository. This lets other developers get a sense of what you're working on, and give early feedback where applicable.

Upon completion, the feature branch shall be merged into the develop branch through a review process: The feature developer will create a pull request to the develop branch. This initiates the review process. If everything is confirmed okay, the reviewer shall merge the code to the development branch.

**Review.**

The Review process starts with the creation of a merge request to the develop branch by the feature developer. The assignee of the branch is the reviewer. The review process accomplishes the following. 1. Increases confidence of the 2. Ensures that the guidelines highlighted in this document are followed 3. Improves continuous familiarity with the code base among the developers

The reviewer shall together with the feature developer ensure: 1. The feature works, i.e. it meets the definition of done for the corresponding ticket 2. The development guidelines are adhered to.

We do not expect that buggy code is submitted for reviewer, however correctness checking must still be done due to the possibility of corner cases.

In general, the review process will result in feedback being made to the feature developer about improvements that can be made to the code. Remember, we share collective responsibility for the code, so every developer should be welcome to receiving feedback.

In the case of bugs making their way to production. Primary responsibility for fix lies in the hands of the feature developer and the reviewer.

**Release.**

Release shall take the following form. The latest commit on the develop branch on which test passes shall be deployed to the staging server. After acceptance testing, the develop branch up to this commit is merged into the master branch, and version tagged for release.

**Hotfixes.**

In the case of urgent post-deployement fixes, the following process shall be adopted:

Prepare a hotfix branch containing the changes, this branch should be based off of the master branch. Ideally, get it reviewed by one other developer, the pull request should be created against the master branch also. After deployment, if everything works, the master branch should be merged into the develop branch.

**Committing directly to** **master\*\***/\***\*develop** **branches.**

Commiting directly to master/develop is restricted to a few certain persons. In exceptional cases, for small commits (e.g version number changes, additional diagnostics logging, permissions to beta, etc.) it might make sense to commit directly to the develop or master branches. Such changes should be kept small, and should be restricted only to obvious changes for which review is not necessary/useful. When in doubt, just create a feature branch.
