# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [alpha_0.1.0] - 2024-01-30

### Added

-   Form for defining Criteria (#1).
-   Routing (#2).
-   Component for Estimation of Weights (#6).
-   Normalized table and summary views (#12).
-   Weight operations & calculations of weighted sums (#13).
-   Navigation buttons (#3, #9).
-   Default sorting by sum of weights on the summary view (#15).
-   Option to use demo data (#23).
-   Option to delete Criteria (#26).
-   Angular Material (#34).
-   Loading spinners (#45).
-   Slovak localization (#11).
-   Option to delete Alternatives (#27).
-   This changelog (#49)!
-   Tooltips for disabled buttons (#35).
-   Persistent navbar with language options (#50).
-   Release information on the landing screen (#51).

### Fixed

-   Type mismatch in alternative definition (#22).
-   Styling in Criteria Definition (#5).
-   Radio buttons for min/max inputs in Define Criteria (#14).
-   Form validation for Criteria definition (#20).
-   Type validation for alternatives (#21).
-   Next button disabled if no criteria are defined (#35).
-   Form validation for weight estimation (#40).
-   App config for the translations to work in production (#41).

### Changed

-   Unified alternative interfaces & refactored alternative service (#29).
-   Refactored demo data structure (#32).
-   All clunky grid/flex elements replaced with Material components (#38).
-   Replaced repeated template patterns for common components (#18).
-   Moved language options from welcome screen to a persistent navbar (#50).
-   Moved helper functions to a util file (#30).

### Removed

-   Repeated template patterns (#19).
-   Repeated functions (#30).

## [alpha_0.1.3] - 2024-02-XX

### Added

-   Criteria validation check for already used criteria names (#54).
-   Alert service for rendering Material Snackbars (#54).

### Fixed

-   Geomean & Weight% calculations (#52).
