import { describe, it } from 'mocha';
import { expect } from 'chai';
import TournamentGenerator from '../src/tournamentGenerator.js';
import TeamGenerator from "../src/teamGenerator.js";

describe('TournamentGenerator', () => {
    let tournamentGenerator;
    let teamGenerator;

    function setup(players) {
        teamGenerator = new TeamGenerator(players);
        teamGenerator.generateTeams();
        tournamentGenerator = new TournamentGenerator(teamGenerator.getTeams());
    }

    it('should create a tournament with basic parameters', () => {
        setup(['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10', 'Player 11', 'Player 12']);
        tournamentGenerator.generatePoules();
        const tournament = tournamentGenerator.getPoules();
        expect(tournament).to.have.lengthOf(1);
    });

    it('should generate 2 pools to the tournament', () => {
        setup(['Player A', 'Player B', 'Player C', 'Player D', 'Player E', 'Player F', 'Player G', 'Player H', 'Player I', 'Player J', 'Player K', 'Player L', 'Player M', 'Player N', 'Player O', 'Player P', 'Player Q', 'Player R', 'Player S', 'Player T', 'Player U', 'Player V', 'Player W', 'Player X']);
        tournamentGenerator.generatePoules();
        const tournament = tournamentGenerator.getPoules();
        expect(tournament).to.have.lengthOf(2);
        expect(tournament[0].length).to.equal(4);
    });
    it('should simulate matches and qualify teams for final stages', () => {
        setup(['Player A', 'Player B', 'Player C', 'Player D', 'Player E', 'Player F', 'Player G', 'Player H', 'Player I', 'Player J', 'Player K', 'Player L', 'Player M', 'Player N', 'Player O', 'Player P']);
        tournamentGenerator.generatePoules();
        tournamentGenerator.simulatePoulesMatches();
        const finalStages = tournamentGenerator.finalStages;
        expect(finalStages).to.have.lengthOf(1);
        expect(finalStages[0]).to.have.lengthOf(2);
    });
    it('should generate final stages until only one team remains', () => {
        setup(['Player A', 'Player B', 'Player C', 'Player D', 'Player E', 'Player F', 'Player G', 'Player H', 'Player I', 'Player J', 'Player K', 'Player L', 'Player M', 'Player N', 'Player O', 'Player P']);
        tournamentGenerator.generatePoules();
        tournamentGenerator.simulatePoulesMatches();
        tournamentGenerator.generateFinalStages();
        const finalStages = tournamentGenerator.finalStages;
        expect(finalStages[1]).to.have.lengthOf(1);
    });
    it('should generate the entire tournament', () => {
        setup(['Player A', 'Player B', 'Player C', 'Player D', 'Player E', 'Player F', 'Player G', 'Player H', 'Player I', 'Player J', 'Player K', 'Player L', 'Player M', 'Player N', 'Player O', 'Player P']);
        const tournament = tournamentGenerator.generateTournament();
        expect(tournament[1]).to.have.lengthOf(1);
    });

});
