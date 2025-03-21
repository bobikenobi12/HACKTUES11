package org.acme;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.acme.models.CandidateScoring;
import org.acme.models.CompanyDetail;
import org.acme.models.CvSummary;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class UploadDataResponse {
    /*{
    "full_name": "Ivan Lambev",
    "birthdate": "1990-01-01",
    "cv_content": " \nIvan Lambev \nLorem ipsum dolor sit amet, consectetuer adipiscing elit \n \nEXPERIENCE \nТЕХ-МА ЕООД \n \n2021 \nРаботил съм като счетоводител \nЕКО РЕ ЕООД \n2020 \nБил съм елитен чистач \nРАД - 72 ООД \n2018 \nРабтил съм като програмист \nEDUCATION \nSchool Name, Location — Degree \nMONTH 20XX - MONTH 20XX \nLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam \nnonummy nibh euismod tincidunt ut laoreet dolore. \nSchool Name, Location — Degree \nMONTH 20XX - MONTH 20XX \nLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam. \nPROJECTS \nProject Name — Detail \nLorem ipsum dolor sit amet, consectetuer adipiscing elit. \nSKILLS \n​Lorem ipsum dolor sit amet. \n​Consectetuer adipiscing elit. \n​Sed diam nonummy nibh \neuismod tincidunt. \n​L​‌​aoreet dolore magna aliquam \nerat volutpat. \nAWARDS \nLorem ipsum dolor sit amet \nConsectetuer adipiscing elit, \nSed diam nonummy \nNibh euismod tincidunt ut \nlaoreet dolore magna aliquam \nerat volutpat. \nLorem ipsum dolor sit amet \nConsectetuer adipiscing elit, \nSed diam nonummy \nNibh euismod tincidunt ut \nlaoreet dolore magna aliquam \nerat volutpat. \nLANGUAGES \nLorem ipsum, Dolor sit amet, \nConsectetuer \n \n",
    "cv_summary": {
        "Full Name": "Ivan Lambev",
        "Work Experience": [
            {
                "Company": "ТЕХ-МА ЕООД"
            },
            {
                "Company": "ЕКО РЕ ЕООД"
            },
            {
                "Company": "РАД - 72 ООД"
            }
        ],
        "Known Programming Languages": [],
        "Skills": [
            "Lorem ipsum dolor sit amet.",
            "Consectetuer adipiscing elit.",
            "Sed diam nonummy nibh euismod tincidunt.",
            "L​‌​aoreet dolore magna aliquam erat volutpat."
        ],
        "Education": {
            "Degree": "Degree",
            "Institute": "School Name, Location",
            "Location": "",
            "Duration": "MONTH 20XX - MONTH 20XX"
        }
    },
    "companies": [
        "ТЕХ-МА ЕООД",
        "ЕКО РЕ ЕООД",
        "РАД - 72 ООД"
    ],
    "company_details": [
        {
            "name": "ТЕХ-МА ЕООД",
            "details": {
                "text": "ТЕХ-МА ЕООД\nДъщерни дружества\nФинансови показатели\nСлужители\nМнения\nРезюме\nХронология\nСвързани фирми\nГодина Оборот Печалба Марж на печалбата\n2021 855 000 лв. 8.5% - -\n2020 788 000 лв. -34.33% - -\n2019 1 200 000 лв. -32.39% 23 000 лв. 1.92%\n2018 1 775 000 лв. -20.37% - -\n2017 2 229 000 лв. -12.04% - -\n2016 2 534 000 лв. 49.41% - -\n2015 1 696 000 лв. 36.77% - -\n2014 1 240 000 лв. 1.89% - -\n2013 1 217 000 лв. - -\nГодина Служители\n2021 29 -21.62%\n2019 37 -19.57%\n2018 46\n2017 46 4.55%\n2016 44\n2015 44 -4.35%\n2014 46 6.98%\n2013 43\nГодина\nОборот\nПечалба\nМарж на печалбата\nГодина\nСлужители\n2021\n855 000 лв. 8.5%\n-\n-\n2020\n788 000 лв. -34.33%\n-\n-\n2019\n1 200 000 лв. -32.39%\n23 000 лв.\n1.92%\n2018\n1 775 000 лв. -20.37%\n-\n-\n2017\n2 229 000 лв. -12.04%\n-\n-\n2016\n2 534 000 лв. 49.41%\n-\n-\n2015\n1 696 000 лв. 36.77%\n-\n-\n2014\n1 240 000 лв. 1.89%\n-\n-\n2013\n1 217 000 лв.\n-\n-\n2021\n29 -21.62%\n2019\n37 -19.57%\n2018\n46\n2017\n46 4.55%\n2016\n44\n2015\n44 -4.35%\n2014\n46 6.98%\n2013\n43"
            },
            "timestamp": "2025-03-21T10:47:19.268510"
        },
        {
            "name": "ЕКО РЕ ЕООД",
            "details": {
                "text": "ЕКО РЕ ЕООД\nДъщерни дружества\nФинансови показатели\nСлужители\nМнения\nРезюме\nХронология\nСвързани фирми\nГодина Оборот Печалба Марж на печалбата\n2021 2 601 000 лв. 78.76% - -\n2020 1 455 000 лв. 29.1% - -\n2019 1 127 000 лв. -37.63% 0 лв. -\n2018 1 807 000 лв. -4.49% - -\n2017 1 892 000 лв. 48.28% - -\n2016 1 276 000 лв. -4.49% - -\n2015 1 336 000 лв. 11.99% - -\n2014 1 193 000 лв. 103.24% - -\n2013 587 000 лв. - -\nГодина Служители\n2021 5\n2019 5 25%\n2018 4 -20%\n2017 5\n2016 5\n2015 5 150%\n2014 2 -33.33%\n2013 3\nГодина\nОборот\nПечалба\nМарж на печалбата\nГодина\nСлужители\n2021\n2 601 000 лв. 78.76%\n-\n-\n2020\n1 455 000 лв. 29.1%\n-\n-\n2019\n1 127 000 лв. -37.63%\n0 лв.\n-\n2018\n1 807 000 лв. -4.49%\n-\n-\n2017\n1 892 000 лв. 48.28%\n-\n-\n2016\n1 276 000 лв. -4.49%\n-\n-\n2015\n1 336 000 лв. 11.99%\n-\n-\n2014\n1 193 000 лв. 103.24%\n-\n-\n2013\n587 000 лв.\n-\n-\n2021\n5\n2019\n5 25%\n2018\n4 -20%\n2017\n5\n2016\n5\n2015\n5 150%\n2014\n2 -33.33%\n2013\n3"
            },
            "timestamp": "2025-03-21T10:47:52.105381"
        },
        {
            "name": "РАД - 72 ООД",
            "details": {
                "text": "РАД - 72 ООД\nДъщерни дружества\nФинансови показатели\nСлужители\nМнения\nРезюме\nХронология\nСвързани фирми\nГодина Оборот Печалба Марж на печалбата\n2021 1 769 000 лв. 10.63% - -\n2020 1 599 000 лв. -19% - -\n2019 1 974 000 лв. 37.47% 0 лв. -\n2018 1 436 000 лв. 19.27% - -\n2017 1 204 000 лв. -3.76% - -\n2016 1 251 000 лв. 13.73% - -\n2015 1 100 000 лв. 100% - -\n2014 550 000 лв. 12.47% - -\n2013 489 000 лв. - -\nГодина Служители\n2021 10 66.67%\n2020 6 -33.33%\n2019 9 28.57%\n2018 7 -12.5%\n2017 8 14.29%\n2016 7\n2015 7\n2014 7 -12.5%\n2013 8\nГодина\nОборот\nПечалба\nМарж на печалбата\nГодина\nСлужители\n2021\n1 769 000 лв. 10.63%\n-\n-\n2020\n1 599 000 лв. -19%\n-\n-\n2019\n1 974 000 лв. 37.47%\n0 лв.\n-\n2018\n1 436 000 лв. 19.27%\n-\n-\n2017\n1 204 000 лв. -3.76%\n-\n-\n2016\n1 251 000 лв. 13.73%\n-\n-\n2015\n1 100 000 лв. 100%\n-\n-\n2014\n550 000 лв. 12.47%\n-\n-\n2013\n489 000 лв.\n-\n-\n2021\n10 66.67%\n2020\n6 -33.33%\n2019\n9 28.57%\n2018\n7 -12.5%\n2017\n8 14.29%\n2016\n7\n2015\n7\n2014\n7 -12.5%\n2013\n8"
            },
            "timestamp": "2025-03-21T10:48:33.852632"
        }
    ],
    "candidate_scoring": {
        "loyalty": 20,
        "ethical_integrity": 10,
        "job_tenure": 10,
        "professional_references": 50,
        "online_professional_reputation": 50,
        "criminal_record": 0,
        "regulatory_violations": 0,
        "work_experience_level": 50,
        "certifications_achieved": 50,
        "education_level": 50,
        "career_progression": 50,
        "leadership_experience": 50,
        "career_stability": 20,
        "salary_history": 50,
        "employment_gaps": 0,
        "linkedin_recommendations": 50
    }
}

     */
    public String full_name;
    public String birthdate;
    public String cv_content;
    public CvSummary cv_summary;
    public List<String> companies;
    public List<CompanyDetail> company_details;
    public CandidateScoring candidate_scoring;












}
