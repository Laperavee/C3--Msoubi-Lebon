import { describe, it } from 'mocha';
import { expect } from 'chai';
import TeamGenerator from '../src/teamGenerator.js';

describe('TeamGenerator', () => {
    describe('#generateTeams', () => {
        it('should generate teams with the specified number of players per team', () => {
            const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];
            const playersPerTeam = 3;
            const teamGenerator = new TeamGenerator(players, playersPerTeam);

            teamGenerator.generateTeams();

            const teams = teamGenerator.getTeams();
            expect(teams).to.be.an('array');
            expect(teams).to.have.lengthOf(2); // 6 players divided into teams of 3
            teams.forEach(team => {
                expect(team).to.have.property('name');
                expect(team).to.have.property('players');
                expect(team.players).to.be.an('array');
                expect(team.players).to.have.lengthOf(playersPerTeam);
            });
        });
    });

    describe('#getTeams', () => {
        it('should return an empty array if teams have not been generated', () => {
            const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];
            const playersPerTeam = 3;
            const teamGenerator = new TeamGenerator(players, playersPerTeam);

            const teams = teamGenerator.getTeams();

            expect(teams).to.be.an('array');
            expect(teams).to.be.empty;
        });
    });
});
