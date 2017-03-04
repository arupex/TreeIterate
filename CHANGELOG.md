NPM Releases
*Bower Only Release

1.0.0 - First Release
1.0.1 - Fixed Documentation
1.0.2 - Fixed Root Parent Issue, return tree as well as in-place modification
1.0.3 - Added 3rd parameters to callback which gives parent history
1.0.4 - Fix Parents Parameter Bug introduced in 1.0.3, update readme and tests
*1.0.5 - Bower Release
*1.0.6 - Truely Fixing Parent issue with a better test to handle ancestory of large trees
1.0.7 - Release Updates to NPM with Readme updates and Performance Tests
1.0.8 - Travis-CI readme / badges
1.0.9 - A bit of an overhall enabling some configurability, and allowing for even better performance
1.0.10 - Fixing root parents

1.1.0 - No Breaking Changes Intended ( however some may occur )
    Cleanup conditions
    changed Array.push.apply to loop (large arrays fails)
    cleanup unnecessary tmp variables
    use traditional for() loop instead of forEach (performance)
    Performance Improvements all around! in most cases 50% (giant trees *0.5 million elements or greater* are slower, but safer with new code)
    
1.1.1 - Added lifetime download counter to readme