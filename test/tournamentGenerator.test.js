import { expect } from 'chai';
import TournamentGenerator from '../src/tournamentGenerator.js';

describe('TournamentGenerator', () => {
    let teams = [
        { name: 'Team A', players: ['Player 1', 'Player 2', 'Player 3'] },
        { name: 'Team B', players: ['Player 4', 'Player 5', 'Player 6'] },
        { name: 'Team C', players: ['Player 7', 'Player 8', 'Player 9'] },
        { name: 'Team D', players: ['Player 10', 'Player 11', 'Player 12'] },
        { name: 'Team E', players: ['Player 13', 'Player 14', 'Player 15'] },
        { name: 'Team F', players: ['Player 16', 'Player 17', 'Player 18'] }
    ];

    let tournamentGenerator;

    function setup(Teams = teams) {
        tournamentGenerator = new TournamentGenerator(Teams);
    }

    it('generatePoules should generate correct number of groups with correct teams', () => {
        tournamentGenerator.generatePoules();

        expect(tournamentGenerator.poules.length).to.be.gte(1); // Au moins une poule générée

        for (let poule of tournamentGenerator.poules) {
            expect(poule.length).to.equal(4); // Chaque poule contient 4 équipes
            expect(poule.every(team => teams.includes(team))).to.be.true; // Chaque équipe est incluse dans la liste initiale des équipes
        }
    });

    it('simulatePoulesMatches should qualify correct teams for final stages', () => {
        tournamentGenerator.generatePoules();
        tournamentGenerator.simulatePoulesMatches();

        expect(tournamentGenerator.finalStages.length).to.equal(1); // Une seule phase finale

        const qualifiedTeams = tournamentGenerator.finalStages[0];
        expect(qualifiedTeams.length).to.be.gte(2); // Au moins deux équipes qualifiées

        for (let team of qualifiedTeams) {
            expect(teams.includes(team)).to.be.true; // Chaque équipe qualifiée est incluse dans la liste initiale des équipes
        }
    });

    it('generateFinalStages should generate correct number of final stages with correct teams', () => {
        tournamentGenerator.generatePoules();
        tournamentGenerator.simulatePoulesMatches();
        tournamentGenerator.generateFinalStages();

        expect(tournamentGenerator.finalStages.length).to.be.gte(1); // Au moins une phase finale

        let currentStage = tournamentGenerator.finalStages[0];
        while (currentStage.length > 1) {
            const nextStage = tournamentGenerator.finalStages[tournamentGenerator.finalStages.length - 1];
            expect(nextStage.length).to.equal(Math.ceil(currentStage.length / 2)); // Nombre correct d'équipes dans la prochaine phase
            currentStage = nextStage;
        }
    });
    it('generateFinalStages without Poules', () => {
        let teams = [
            { name: 'Team A', players: ['Player 1', 'Player 2', 'Player 3'] },
            { name: 'Team B', players: ['Player 4', 'Player 5', 'Player 6'] },
            { name: 'Team C', players: ['Player 7', 'Player 8', 'Player 9'] },
            { name: 'Team D', players: ['Player 10', 'Player 11', 'Player 12'] },
            { name: 'Team E', players: ['Player 13', 'Player 14', 'Player 15'] },
            { name: 'Team F', players: ['Player 16', 'Player 17', 'Player 18'] },
            { name: 'Team G', players: ['Player 19', 'Player 20', 'Player 21'] }
        ];
        setup(teams)
        tournamentGenerator.generateDeathMatchTournament();
        expect(tournamentGenerator.DeathMatch.length).to.be.gte(1);
    });
})
