import { describe, it } from 'mocha';
import { expect } from 'chai';
import TeamGenerator from '../src/teamGenerator.js';

describe('TeamGenerator', () => {
    describe('constructor', () => {
        it('should create a TeamGenerator object with provided players and default playersPerTeam', () => {
            const players = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];
            const teamGenerator = new TeamGenerator(players);

            expect(teamGenerator.players).to.deep.equal(players);
            expect(teamGenerator.playersPerTeam).to.equal(3);
            expect(teamGenerator.teams).to.deep.equal([]);
        });

        it('should create a TeamGenerator object with provided players and custom playersPerTeam', () => {
            const players = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];
            const playersPerTeam = 2;
            const teamGenerator = new TeamGenerator(players, playersPerTeam);

            expect(teamGenerator.players).to.deep.equal(players);
            expect(teamGenerator.playersPerTeam).to.equal(playersPerTeam);
            expect(teamGenerator.teams).to.deep.equal([]);
        });
    });

    describe('generateTeams', () => {
        it('should generate teams with specified number of players per team', () => {
            const players = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];
            const playersPerTeam = 2;
            const teamGenerator = new TeamGenerator(players, playersPerTeam);

            teamGenerator.generateTeams();

            expect(teamGenerator.teams.length).to.equal(Math.ceil(players.length / playersPerTeam));

            teamGenerator.teams.forEach(team => {
                expect(team.players.length).to.be.lessThanOrEqual(playersPerTeam);
            });
        });
    });

    describe('getTeams', () => {
        it('should return the generated teams', () => {
            const players = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'];
            const teamGenerator = new TeamGenerator(players);

            teamGenerator.generateTeams();

            expect(teamGenerator.getTeams()).to.deep.equal(teamGenerator.teams);
        });
    });
});
