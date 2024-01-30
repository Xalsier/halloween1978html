import { profiles, generateProfileElements, updateTopProfile } from './profiles.js';
import logs, { handleSuggestion, displaySuggestions } from './logs.js';

$(document).ready(function() {
    let profile = 1;
    let events = logs[profile];
    let typing = false;
    let currentSuggestionBeingProcessed = null;
    generateProfileElements($('.main1'));
    function showTypingIndicator(speaker) {
        const typingIndicator = $("<div></div>").addClass("message typing-indicator").text("* * *");
        if (speaker === "Heather") {
            typingIndicator.addClass("align-right");
        } else {
            typingIndicator.addClass("align-left");
        }
        chat.append(typingIndicator);
    }

    function removeTypingIndicator() {
        $(".typing-indicator").remove();
    }

    async function updateProfile(newProfile) {
        profile = newProfile;
        clearSuggestions();
        updateEvents(profile);
        updateTopProfile(profiles[profile], $('.top .profile-image'), $('.top .placeholderDiv'), $('.top .title'));
    }

    async function addMessageWithDynamicDelay(speaker, message, delay) {
        const messageDiv = $("<div></div>").addClass("message").css("display", "none");
        if (speaker === "Heather") {
            messageDiv.addClass("message-heather");
        }
        messageDiv.html(`<strong>${speaker}:</strong> ${message}`);
        chat.append(messageDiv);
        await new Promise((resolve) => setTimeout(resolve, delay));
        messageDiv.css("display", "");
        if (chat.scrollTop() + chat.innerHeight() >= chat[0].scrollHeight - 100) {
            chat.scrollTop(chat.prop("scrollHeight"));
        }
    }

    function clearSuggestions() {
        $(".suggestions").empty();
    }

    function updateEvents(profileId) {
        events = logs[profileId];
    }

    updateEvents(profile);

    async function displayLogMessages(logKey) {
        const log = events && events[logKey];
        if (!log) {
            console.error("No events found for log:", logKey);
            return;
        }
        chat.empty();
        for (const [speaker, message, delay] of log.dialogues) {
            showTypingIndicator(speaker);
            try {
                await addMessageWithDynamicDelay(speaker, message, delay);
            } catch (error) {
                console.error("Error displaying message:", error);
            }
            removeTypingIndicator();
        }
        const nextLogKey = log.nextSuggestion;
        if (nextLogKey) {
            displayLogMessages(nextLogKey);
        }
    }

    $(".suggestions").on("click", ".suggestion-button", function() {
        const suggestion = $(this).text();
        console.log("Suggestion clicked:", suggestion);
        displayLogMessages(suggestion);
    });

    const chat = $(".chat");
    const messageInput = $("#messageInput");

    messageInput.on("input", function() {
        const inputText = messageInput.val().trim().toLowerCase();
        if (inputText === "") {
            clearSuggestions();
        } else {
            const filteredSuggestions = Object.keys(events).filter(eventName =>
                eventName.toLowerCase().includes(inputText)
            );
            displaySuggestions(filteredSuggestions, $(".suggestions"), (suggestion) => {
                handleSuggestion(suggestion, events, addMessageWithDynamicDelay);
            });
        }
    });

    $('.main1 img').each(function(index) {
        if ($(this).attr('src') === '') {
            const altText = $(this).attr('alt');
            const initials = altText.match(/\b(\w)/g).join('');
            const placeholderDiv = $('<div></div>').addClass('placeholderDiv').text(initials).attr('data-profileid', index + 1);
            $(this).replaceWith(placeholderDiv);
        }
    });

    $('.main1 [data-profileid]').on("click", function() {
        const newProfile = parseInt($(this).attr('data-profileid'));
        if (!isNaN(newProfile)) {
            updateProfile(newProfile);
        }
    });
});
