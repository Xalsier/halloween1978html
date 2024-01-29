import dice from './dice.js';

$(document).ready(function() {
    const $inputCommand = $('.input-command');
    let lastSelectedStatValue = null;

    function updateCommandInput(command) {
        $inputCommand.val(command);
    }

    function getStatValue(statElement) {
        return statElement.split(' ')[1];
    }

    function constructCommand(baseCommand, statValue) {
        if (baseCommand.includes("+7")) {
            return baseCommand.replace("+7", statValue ? `+${statValue}` : "+7");
        }
        if (statValue && !baseCommand.includes("kh1") && !baseCommand.includes("kl1") && !baseCommand.includes("d20 -")) {
            return baseCommand + `+${statValue}`;
        }
        return baseCommand;
    }

    $('.container').on('click', '.stat', function() {
        lastSelectedStatValue = getStatValue($(this).text());
        updateCommandInput(constructCommand("!roll d20+7", lastSelectedStatValue));
    });

    $('.container').on('click', '.command-item', function() {
        const commandBase = $(this).data('command') || $(this).text().split(' - ')[0].trim();
        updateCommandInput(constructCommand(commandBase, lastSelectedStatValue));
    });

    $('.container').on('click', '.modifier-btn', function() {
        const modifier = parseInt($(this).data('modifier'));
        const currentCommand = $inputCommand.val();
        const regex = /(\+|-)?\d+$/;
        const newCommand = regex.test(currentCommand) ? currentCommand.replace(regex, (match, p1) => p1 + (parseInt(match) + modifier)) : currentCommand + '+' + modifier;
        updateCommandInput(newCommand);
    });

    $('.container').on('click', '.color-btn', function() {
        const buttonText = $(this).text();
        const diceType = dice.diceTypes[buttonText.match(/DC \d+/)[0]];
        updateCommandInput($inputCommand.val().replace(/d\d+/, `d${diceType}`));
    });

    $('.container').on('click', '.copy-btn', async function() {
        const copyText = $inputCommand.val();
        try {
            await navigator.clipboard.writeText(copyText);
        } catch (err) {
            $inputCommand.select();
            document.execCommand('copy');
            console.error('Error copying text: ', err);
        }
    });
});
