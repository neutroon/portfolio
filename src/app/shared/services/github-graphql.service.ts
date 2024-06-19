import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubGraphqlService {
  constructor(private _Apollo: Apollo, private _HttpClient: HttpClient) {}

  getTotalContributions(username: string) {
    const query = gql`
      {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    return this._Apollo
      .query({
        query,
      })
      .pipe(
        map((result: any) => {
          return result.data.user.contributionsCollection.contributionCalendar
            .totalContributions;
        })
      );
  }
  private apiUrl = 'https://api.github.com/users/';
  private accessToken = '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';

  getUserRepoCount(username: string) {
    const url = `${this.apiUrl}${username}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    return this._HttpClient.get<any>(url, { headers }).pipe(
      map((response) => {
        const publicRepos = response.public_repos;
        const privateRepos = response.total_private_repos;
        const allRepos = publicRepos + privateRepos;
        return allRepos;
      })
    );
    // .toPromise()
    // .then((response) => {
    //   const publicRepos = response.public_repos;
    //   const privateRepos = response.total_private_repos;
    //   return { publicRepos, privateRepos };
    // })
    // .catch((error) => {
    //   console.error('Error fetching data:', error);
    //   throw error;
    // });
  }
}
