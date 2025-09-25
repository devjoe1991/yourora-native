main
├── navigation - Sidebar navigation, Mixed media feed integration, video tab replaced with Your Ora tab
└── yourora-tab (new feature)

Feature Branch from Main
Why this is best:
✅ Clean separation: Each feature is independent
✅ Easy merging: No conflicts between features
✅ Safe development: Won't break existing navigation work
✅ Clear history: Easy to see what each branch contains

Branch Naming Convention
Feature Branches:
navigation - Sidebar and mixed media feed
yourora-tab - YourOra tab content
user-profiles - User profile features
notifications - Notification system
settings - Settings and preferences

Merging Strategy
When to Merge:
Navigation branch → main (when navigation is complete)
YourOra tab → main (when tab is ready)
Never merge feature branches into each other

Example merging process:
# Merge navigation to main
git checkout main
git merge navigation
git push origin main

# Merge YourOra tab to main
git checkout main
git merge yourora-tab
git push origin main

-------
I will create a demo strategy branch called 
demo-all-features adn i will merge all the features i have currently worked on from the branches, to seamlessly show Maximus and Verity.

Step 1: Create Demo Branch
# Create demo branch with all features
git checkout main
git checkout -b demo-all-features
git merge navigation
git merge yourora-tab
git push origin demo-all-features

Use Demo Branch for maximus and Verity
Switch to demo branch: git checkout demo-all-features
Show all features

Keep Development Branches
Kepp all the feature by feature branches for exmaple keep Navigation brnach, youroratab content branch - this will be useful for ongoing work

Update Demo Branch
# Add new feature to demo branch
git checkout demo-all-features
git merge **new-feature-branch**
git push origin demo-all-features
# Demo branch now has the new feature
Keep things away from the main branch - when fixing bugs use the Demo branch.

Quick Commands list
# Create demo branch with all features
git checkout main
git checkout -b demo-all-features
git merge navigation
git merge yourora-tab
git push origin demo-all-features

# Use demo branch for client
git checkout demo-all-features
# Show all features to client

# Update demo with new features
git checkout demo-all-features
git merge new-feature-branch
git push origin demo-all-features

------
Removing Features from Demo Branch -
If i want to then remove specific features form the dmeo branch after merging it in i can revert the merge 
Revert the Merge
# Find the merge commit
git log --oneline
# Look for: "Merge branch 'feature-name' into demo-all-features"

# Revert the merge
git revert -m 1 <merge-commit-hash>
# This removes the feature from demo branch

Feature Branches Stay Intact After Merging
Key Point: Merging COPIES, Doesn't Move
 Feature branches keep their content: Nothing is removed
Demo branch gets copies: Features are duplicated
Branches stay independent: Each has its own history
No data loss: Everything is preserved

Before merge:
main ← navigation (has sidebar + mixed media)
main ← yourora-tab (has YourOra tab)

After merging to demo:
main ← navigation (STILL HAS sidebar + mixed media)
main ← yourora-tab (STILL HAS YourOra tab)
main ← demo-all-features (has BOTH features)


Question and answers for future 
Q: Do I make demo branch from main?
A: YES - Create demo branch from main, then merge features one by one.
Q: Is the feature still on the original branch?
A: YES - The feature stays on the original branch. Merging copies the content, it doesn't move it.
Q: Does the branch start new?
A: NO - The branch keeps its history and content. It's not affected by merging.

Recommended Workflow
Step 1: Create Demo Branch
git checkout main
git checkout -b demo-all-features
git push origin demo-all-features

Step 2: Merge Features Gradually
# Add navigation features
git checkout demo-all-features
git merge navigation
git push origin demo-all-features

# Add YourOra tab later
git checkout demo-all-features
git merge yourora-tab
git push origin demo-all-features

**As a rule of thumb**
Keep demo branch for maximus/verity presentations, but create new features from main for clean development!
you can call the demo branches by dates if that is more helpful 