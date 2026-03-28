#!/bin/bash

# 1. Move to main and get latest
git checkout main
git pull origin main

# 2. Get a list of all remote branches that start with 'v0-'
# We use 'sed' to clean up the 'origin/' prefix
branches=$(git branch -r | grep 'origin/v0-' | sed 's/origin\///')

for branch in $branches; do
    echo "Merging $branch..."
    
    # Merge the branch into main
    git merge "origin/$branch" --no-edit
    
    # If merge is successful, delete the remote branch
    if [ $? -eq 0 ]; then
        echo "Successfully merged $branch. Deleting remote..."
        git push origin --delete "$branch"
    else
        echo "Conflict detected in $branch. Stopping script so you can fix it in VS Code."
        exit 1
    fi
done

# 3. Push all the new merged changes to GitHub
git push origin main
echo "Done! Your main branch is up to date and v0 branches are cleared."
