const logs = {
    "1": {
        "Log #1": {
            default: true,
            dialogues: [
                ["Heather", "Ahem.", 0, 1],
                ["Heather", "Hiiiii!", 500, 2],
                ["Heather", "I'm right now, holding a Motorola..", 500, 3],
                ["Heather", "Jesus christ I think I just stepped into a puddle.", 1000, 4],
                ["Heather", "If this is working, then my RV should be recording this.", 1000, 5],
                ["Heather", "I probably fucked something up I'm going back to check.", 1500, 6]
            ],
            nextSuggestion: "3"
        },
        "Log #3": {
            dialogues: [
                ["Heather", "Starting Log 3 now.", 0, 1],
                ["Heather", "It seems quiet around here.", 500, 2],
                ["Heather", "I'll keep recording just in case.", 500, 3]
            ],
            nextSuggestion: null
        }
    },
    "2": {
        "Log #2": {
            default: true,
            dialogues: [
                ["Heather", "Mayday mayday. There's a situation- or something. Calling sign...Heather.", 500, 7],
                ["Unknown Officer", "Hello? What's the emergency?", 500, 8],
                ["Heather", "There's a", 1000, 9],
                ["Heather", "By a campsite...", 1000, 10],
                ["Heather", "It was to the right I think from that large tree with the hole in the center and a birds nest-", 1500, 11],
                ["Heather", "Close to the entrance of the woods-, a few meters out.", 1500, 12],
                ["Heather", "Someones tracks lead back to the highschool,", 500, 13],
                ["Heather", "I have some photos of them I could probably deliver...2 people were with me.", 500, 14],
                ["Heather", "Safety concern, you know. Over.", 1000, 15],
                ["Unknown Officer", "Woah... in the woods? How long ago did you find this?", 1000, 16],
                ["Heather", "It takes me...a few minutes to walk...", 1500, 17],
                ["Heather", "So I assume at least an hour to half-and hour ago.", 1500, 18],
                ["Heather", "The firepit was fresh, area was still warm. ", 500, 19],
                ["Heather", "We just missed whoever it was, and there was a", 500, 20],
                ["Heather", "I didn't even think of that fuck.", 1000, 21],
                ["Heather", "Sorry, we were worried that he was close enough to attack us back then.", 1000, 22],
                ["Unknown Officer", "Roger that... is that all you found? You aren't pranking me, right?", 1500, 23],
                ["Heather", "No- officer. I'm not pranking you. ", 1500, 24],
                ["Heather", "I should be able to develop the photos in an hour if you want to verify at the station, ", 500, 25],
                ["Heather", "But it'd be better if you sent someone to investigate.", 500, 26],
                ["Unknown Officer", "Alright… Thanks for your report.", 1000, 27]
            ],
            nextSuggestion: null
        }
    }
};
export default logs;

export function handleSuggestion(suggestion, logKey, events, addMessageWithDynamicDelay) {
    if (events && events[suggestion] && events[suggestion][logKey]) {
        const log = events[suggestion][logKey];
        for (const eventMessage of log.dialogues) {
            addMessageWithDynamicDelay(eventMessage[0], eventMessage[1], eventMessage[2], eventMessage[3]);
        }
        return log.nextSuggestion;
    }
    return null;
}

export function displaySuggestions(suggestions, suggestionContainer, handleSuggestionClick) {
    suggestionContainer.empty();
    for (const suggestion of suggestions) {
        const suggestionButton = $("<button></button>");
        suggestionButton.addClass("suggestion-button");
        suggestionButton.text(suggestion);
        suggestionButton.click(() => handleSuggestionClick(suggestion));
        suggestionContainer.append(suggestionButton);
    }
}
