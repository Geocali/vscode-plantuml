import { config } from "../config";
import * as child_process from 'child_process';
import { processWrapper } from "../tools";
import * as vscode from 'vscode';

const preDefinedWords = ";type\n;29\nabstract\nactor\nagent\narchimate\nartifact\nboundary\ncard\nclass\ncloud\ncomponent\ncontrol\ndatabase\ndiamond\nentity\nenum\nfile\nfolder\nframe\ninterface\nnode\nobject\npackage\nparticipant\nqueue\nrectangle\nstack\nstate\nstorage\nusecase\n\n;keyword\n;71\n@enddot\n@endsalt\n@enduml\n@startdot\n@startsalt\n@startuml\nactivate\nagain\nallow_mixing\nallowmixing\nalso\nalt\nas\nautonumber\nbottom\nbox\nbreak\ncaption\ncenter\ncreate\ncritical\ndeactivate\ndestroy\ndown\nelse\nelseif\nend\nendif\nendwhile\nfootbox\nfooter\nfork\ngroup\nheader\nhide\nhnote\nif\nis\nkill\nleft\nlegend\nlink\nloop\nnamespace\nnewpage\nnote\nof\non\nopt\norder\nover\npackage\npage\npar\npartition\nref\nrepeat\nreturn\nright\nrnote\nrotate\nshow\nskin\nskinparam\nstart\nstop\ntitle\ntop\ntop to bottom direction\nup\nwhile\n\n;preprocessor\n;12\n!define\n!definelong\n!else\n!enddefinelong\n!endif\n!exit\n!if\n!ifdef\n!ifndef\n!include\n!pragma\n!undef\n\n;skinparameter\n;514\nActivityBackgroundColor\nActivityBarColor\nActivityBorderColor\nActivityBorderThickness\nActivityDiamondBackgroundColor\nActivityDiamondBorderColor\nActivityDiamondFontColor\nActivityDiamondFontName\nActivityDiamondFontSize\nActivityDiamondFontStyle\nActivityEndColor\nActivityFontColor\nActivityFontName\nActivityFontSize\nActivityFontStyle\nActivityStartColor\nActorBackgroundColor\nActorBorderColor\nActorFontColor\nActorFontName\nActorFontSize\nActorFontStyle\nActorStereotypeFontColor\nActorStereotypeFontName\nActorStereotypeFontSize\nActorStereotypeFontStyle\nAgentBackgroundColor\nAgentBorderColor\nAgentBorderThickness\nAgentFontColor\nAgentFontName\nAgentFontSize\nAgentFontStyle\nAgentStereotypeFontColor\nAgentStereotypeFontName\nAgentStereotypeFontSize\nAgentStereotypeFontStyle\nArrowColor\nArrowFontColor\nArrowFontName\nArrowFontSize\nArrowFontStyle\nArrowLollipopColor\nArrowMessageAlignment\nArrowThickness\nArtifactBackgroundColor\nArtifactBorderColor\nArtifactFontColor\nArtifactFontName\nArtifactFontSize\nArtifactFontStyle\nArtifactStereotypeFontColor\nArtifactStereotypeFontName\nArtifactStereotypeFontSize\nArtifactStereotypeFontStyle\nBackgroundColor\nBiddableBackgroundColor\nBiddableBorderColor\nBoundaryBackgroundColor\nBoundaryBorderColor\nBoundaryFontColor\nBoundaryFontName\nBoundaryFontSize\nBoundaryFontStyle\nBoundaryStereotypeFontColor\nBoundaryStereotypeFontName\nBoundaryStereotypeFontSize\nBoundaryStereotypeFontStyle\nBoxPadding\nCaptionFontColor\nCaptionFontName\nCaptionFontSize\nCaptionFontStyle\nCardBackgroundColor\nCardBorderColor\nCardBorderThickness\nCardFontColor\nCardFontName\nCardFontSize\nCardFontStyle\nCardStereotypeFontColor\nCardStereotypeFontName\nCardStereotypeFontSize\nCardStereotypeFontStyle\nCircledCharacterFontColor\nCircledCharacterFontName\nCircledCharacterFontSize\nCircledCharacterFontStyle\nCircledCharacterRadius\nClassAttributeFontColor\nClassAttributeFontName\nClassAttributeFontSize\nClassAttributeFontStyle\nClassAttributeIconSize\nClassBackgroundColor\nClassBorderColor\nClassBorderThickness\nClassFontColor\nClassFontName\nClassFontSize\nClassFontStyle\nClassHeaderBackgroundColor\nClassStereotypeFontColor\nClassStereotypeFontName\nClassStereotypeFontSize\nClassStereotypeFontStyle\nCloudBackgroundColor\nCloudBorderColor\nCloudFontColor\nCloudFontName\nCloudFontSize\nCloudFontStyle\nCloudStereotypeFontColor\nCloudStereotypeFontName\nCloudStereotypeFontSize\nCloudStereotypeFontStyle\nCollectionsBackgroundColor\nCollectionsBorderColor\nColorArrowSeparationSpace\nComponentBackgroundColor\nComponentBorderColor\nComponentBorderThickness\nComponentFontColor\nComponentFontName\nComponentFontSize\nComponentFontStyle\nComponentStereotypeFontColor\nComponentStereotypeFontName\nComponentStereotypeFontSize\nComponentStereotypeFontStyle\nComponentStyle\nConditionStyle\nControlBackgroundColor\nControlBorderColor\nControlFontColor\nControlFontName\nControlFontSize\nControlFontStyle\nControlStereotypeFontColor\nControlStereotypeFontName\nControlStereotypeFontSize\nControlStereotypeFontStyle\nDatabaseBackgroundColor\nDatabaseBorderColor\nDatabaseFontColor\nDatabaseFontName\nDatabaseFontSize\nDatabaseFontStyle\nDatabaseStereotypeFontColor\nDatabaseStereotypeFontName\nDatabaseStereotypeFontSize\nDatabaseStereotypeFontStyle\nDefaultFontColor\nDefaultFontName\nDefaultFontSize\nDefaultFontStyle\nDefaultMonospacedFontName\nDefaultTextAlignment\nDesignedBackgroundColor\nDesignedBorderColor\nDesignedDomainBorderThickness\nDesignedDomainFontColor\nDesignedDomainFontName\nDesignedDomainFontSize\nDesignedDomainFontStyle\nDesignedDomainStereotypeFontColor\nDesignedDomainStereotypeFontName\nDesignedDomainStereotypeFontSize\nDesignedDomainStereotypeFontStyle\nDiagramBorderColor\nDiagramBorderThickness\nDomainBackgroundColor\nDomainBorderColor\nDomainBorderThickness\nDomainFontColor\nDomainFontName\nDomainFontSize\nDomainFontStyle\nDomainStereotypeFontColor\nDomainStereotypeFontName\nDomainStereotypeFontSize\nDomainStereotypeFontStyle\nDpi\nEntityBackgroundColor\nEntityBorderColor\nEntityFontColor\nEntityFontName\nEntityFontSize\nEntityFontStyle\nEntityStereotypeFontColor\nEntityStereotypeFontName\nEntityStereotypeFontSize\nEntityStereotypeFontStyle\nFileBackgroundColor\nFileBorderColor\nFileFontColor\nFileFontName\nFileFontSize\nFileFontStyle\nFileStereotypeFontColor\nFileStereotypeFontName\nFileStereotypeFontSize\nFileStereotypeFontStyle\nFolderBackgroundColor\nFolderBorderColor\nFolderFontColor\nFolderFontName\nFolderFontSize\nFolderFontStyle\nFolderStereotypeFontColor\nFolderStereotypeFontName\nFolderStereotypeFontSize\nFolderStereotypeFontStyle\nFooterFontColor\nFooterFontName\nFooterFontSize\nFooterFontStyle\nFrameBackgroundColor\nFrameBorderColor\nFrameFontColor\nFrameFontName\nFrameFontSize\nFrameFontStyle\nFrameStereotypeFontColor\nFrameStereotypeFontName\nFrameStereotypeFontSize\nFrameStereotypeFontStyle\nGenericDisplay\nGuillemet\nHandwritten\nHeaderFontColor\nHeaderFontName\nHeaderFontSize\nHeaderFontStyle\nHyperlinkColor\nHyperlinkUnderline\nIconIEMandatoryColor\nIconPackageBackgroundColor\nIconPackageColor\nIconPrivateBackgroundColor\nIconPrivateColor\nIconProtectedBackgroundColor\nIconProtectedColor\nIconPublicBackgroundColor\nIconPublicColor\nInterfaceBackgroundColor\nInterfaceBorderColor\nInterfaceFontColor\nInterfaceFontName\nInterfaceFontSize\nInterfaceFontStyle\nInterfaceStereotypeFontColor\nInterfaceStereotypeFontName\nInterfaceStereotypeFontSize\nInterfaceStereotypeFontStyle\nLegendBackgroundColor\nLegendBorderColor\nLegendBorderThickness\nLegendFontColor\nLegendFontName\nLegendFontSize\nLegendFontStyle\nLexicalBackgroundColor\nLexicalBorderColor\nLinetype\nMachineBackgroundColor\nMachineBorderColor\nMachineBorderThickness\nMachineFontColor\nMachineFontName\nMachineFontSize\nMachineFontStyle\nMachineStereotypeFontColor\nMachineStereotypeFontName\nMachineStereotypeFontSize\nMachineStereotypeFontStyle\nMaxAsciiMessageLength\nMaxMessageSize\nMinClassWidth\nMonochrome\nNodeBackgroundColor\nNodeBorderColor\nNodeFontColor\nNodeFontName\nNodeFontSize\nNodeFontStyle\nNodeStereotypeFontColor\nNodeStereotypeFontName\nNodeStereotypeFontSize\nNodeStereotypeFontStyle\nNodesep\nNoteBackgroundColor\nNoteBorderColor\nNoteBorderThickness\nNoteFontColor\nNoteFontName\nNoteFontSize\nNoteFontStyle\nNoteShadowing\nNoteTextAlignment\nObjectAttributeFontColor\nObjectAttributeFontName\nObjectAttributeFontSize\nObjectAttributeFontStyle\nObjectBackgroundColor\nObjectBorderColor\nObjectBorderThickness\nObjectFontColor\nObjectFontName\nObjectFontSize\nObjectFontStyle\nObjectStereotypeFontColor\nObjectStereotypeFontName\nObjectStereotypeFontSize\nObjectStereotypeFontStyle\nPackageBackgroundColor\nPackageBorderColor\nPackageBorderThickness\nPackageFontColor\nPackageFontName\nPackageFontSize\nPackageFontStyle\nPackageStereotypeFontColor\nPackageStereotypeFontName\nPackageStereotypeFontSize\nPackageStereotypeFontStyle\nPackageStyle\nPackageTitleAlignment\nPadding\nPageBorderColor\nPageExternalColor\nPageMargin\nParticipantBackgroundColor\nParticipantBorderColor\nParticipantFontColor\nParticipantFontName\nParticipantFontSize\nParticipantFontStyle\nParticipantPadding\nPartitionBackgroundColor\nPartitionBorderColor\nPartitionBorderThickness\nPartitionFontColor\nPartitionFontName\nPartitionFontSize\nPartitionFontStyle\nPathHoverColor\nQueueBackgroundColor\nQueueBorderColor\nQueueFontColor\nQueueFontName\nQueueFontSize\nQueueFontStyle\nQueueStereotypeFontColor\nQueueStereotypeFontName\nQueueStereotypeFontSize\nQueueStereotypeFontStyle\nRanksep\nRectangleBackgroundColor\nRectangleBorderColor\nRectangleBorderThickness\nRectangleFontColor\nRectangleFontName\nRectangleFontSize\nRectangleFontStyle\nRectangleStereotypeFontColor\nRectangleStereotypeFontName\nRectangleStereotypeFontSize\nRectangleStereotypeFontStyle\nRequirementBackgroundColor\nRequirementBorderColor\nRequirementBorderThickness\nRequirementFontColor\nRequirementFontName\nRequirementFontSize\nRequirementFontStyle\nRequirementStereotypeFontColor\nRequirementStereotypeFontName\nRequirementStereotypeFontSize\nRequirementStereotypeFontStyle\nResponseMessageBelowArrow\nRoundCorner\nSameClassWidth\nSequenceActorBorderThickness\nSequenceArrowThickness\nSequenceBoxBackgroundColor\nSequenceBoxBorderColor\nSequenceBoxFontColor\nSequenceBoxFontName\nSequenceBoxFontSize\nSequenceBoxFontStyle\nSequenceDelayFontColor\nSequenceDelayFontName\nSequenceDelayFontSize\nSequenceDelayFontStyle\nSequenceDividerBackgroundColor\nSequenceDividerBorderColor\nSequenceDividerBorderThickness\nSequenceDividerFontColor\nSequenceDividerFontName\nSequenceDividerFontSize\nSequenceDividerFontStyle\nSequenceGroupBackgroundColor\nSequenceGroupBodyBackgroundColor\nSequenceGroupBorderColor\nSequenceGroupBorderThickness\nSequenceGroupFontColor\nSequenceGroupFontName\nSequenceGroupFontSize\nSequenceGroupFontStyle\nSequenceGroupHeaderFontColor\nSequenceGroupHeaderFontName\nSequenceGroupHeaderFontSize\nSequenceGroupHeaderFontStyle\nSequenceLifeLineBackgroundColor\nSequenceLifeLineBorderColor\nSequenceLifeLineBorderThickness\nSequenceMessageAlignment\nSequenceMessageTextAlignment\nSequenceNewpageSeparatorColor\nSequenceParticipant\nSequenceParticipantBorderThickness\nSequenceReferenceAlignment\nSequenceReferenceBackgroundColor\nSequenceReferenceBorderColor\nSequenceReferenceBorderThickness\nSequenceReferenceFontColor\nSequenceReferenceFontName\nSequenceReferenceFontSize\nSequenceReferenceFontStyle\nSequenceReferenceHeaderBackgroundColor\nSequenceStereotypeFontColor\nSequenceStereotypeFontName\nSequenceStereotypeFontSize\nSequenceStereotypeFontStyle\nSequenceTitleFontColor\nSequenceTitleFontName\nSequenceTitleFontSize\nSequenceTitleFontStyle\nShadowing\nStackBackgroundColor\nStackBorderColor\nStackFontColor\nStackFontName\nStackFontSize\nStackFontStyle\nStackStereotypeFontColor\nStackStereotypeFontName\nStackStereotypeFontSize\nStackStereotypeFontStyle\nStateAttributeFontColor\nStateAttributeFontName\nStateAttributeFontSize\nStateAttributeFontStyle\nStateBackgroundColor\nStateBorderColor\nStateEndColor\nStateFontColor\nStateFontName\nStateFontSize\nStateFontStyle\nStateStartColor\nStereotypeABackgroundColor\nStereotypeABorderColor\nStereotypeCBackgroundColor\nStereotypeCBorderColor\nStereotypeEBackgroundColor\nStereotypeEBorderColor\nStereotypeIBackgroundColor\nStereotypeIBorderColor\nStereotypeNBackgroundColor\nStereotypeNBorderColor\nStereotypePosition\nStorageBackgroundColor\nStorageBorderColor\nStorageFontColor\nStorageFontName\nStorageFontSize\nStorageFontStyle\nStorageStereotypeFontColor\nStorageStereotypeFontName\nStorageStereotypeFontSize\nStorageStereotypeFontStyle\nStyle\nSvglinkTarget\nSwimlaneBorderColor\nSwimlaneBorderThickness\nSwimlaneTitleFontColor\nSwimlaneTitleFontName\nSwimlaneTitleFontSize\nSwimlaneTitleFontStyle\nSwimlaneWidth\nSwimlaneWrapTitleWidth\nTabSize\nTitleBackgroundColor\nTitleBorderColor\nTitleBorderRoundCorner\nTitleBorderThickness\nTitleFontColor\nTitleFontName\nTitleFontSize\nTitleFontStyle\nUsecaseBackgroundColor\nUsecaseBorderColor\nUsecaseBorderThickness\nUsecaseFontColor\nUsecaseFontName\nUsecaseFontSize\nUsecaseFontStyle\nUsecaseStereotypeFontColor\nUsecaseStereotypeFontName\nUsecaseStereotypeFontSize\nUsecaseStereotypeFontStyle\nWrapWidth\n\n;color\n;154\nAPPLICATION\nAliceBlue\nAntiqueWhite\nAqua\nAquamarine\nAzure\nBUSINESS\nBeige\nBisque\nBlack\nBlanchedAlmond\nBlue\nBlueViolet\nBrown\nBurlyWood\nCadetBlue\nChartreuse\nChocolate\nCoral\nCornflowerBlue\nCornsilk\nCrimson\nCyan\nDarkBlue\nDarkCyan\nDarkGoldenRod\nDarkGray\nDarkGreen\nDarkGrey\nDarkKhaki\nDarkMagenta\nDarkOliveGreen\nDarkOrchid\nDarkRed\nDarkSalmon\nDarkSeaGreen\nDarkSlateBlue\nDarkSlateGray\nDarkSlateGrey\nDarkTurquoise\nDarkViolet\nDarkorange\nDeepPink\nDeepSkyBlue\nDimGray\nDimGrey\nDodgerBlue\nFireBrick\nFloralWhite\nForestGreen\nFuchsia\nGainsboro\nGhostWhite\nGold\nGoldenRod\nGray\nGreen\nGreenYellow\nGrey\nHoneyDew\nHotPink\nIMPLEMENTATION\nIndianRed\nIndigo\nIvory\nKhaki\nLavender\nLavenderBlush\nLawnGreen\nLemonChiffon\nLightBlue\nLightCoral\nLightCyan\nLightGoldenRodYellow\nLightGray\nLightGreen\nLightGrey\nLightPink\nLightSalmon\nLightSeaGreen\nLightSkyBlue\nLightSlateGray\nLightSlateGrey\nLightSteelBlue\nLightYellow\nLime\nLimeGreen\nLinen\nMOTIVATION\nMagenta\nMaroon\nMediumAquaMarine\nMediumBlue\nMediumOrchid\nMediumPurple\nMediumSeaGreen\nMediumSlateBlue\nMediumSpringGreen\nMediumTurquoise\nMediumVioletRed\nMidnightBlue\nMintCream\nMistyRose\nMoccasin\nNavajoWhite\nNavy\nOldLace\nOlive\nOliveDrab\nOrange\nOrangeRed\nOrchid\nPHYSICAL\nPaleGoldenRod\nPaleGreen\nPaleTurquoise\nPaleVioletRed\nPapayaWhip\nPeachPuff\nPeru\nPink\nPlum\nPowderBlue\nPurple\nRed\nRosyBrown\nRoyalBlue\nSTRATEGY\nSaddleBrown\nSalmon\nSandyBrown\nSeaGreen\nSeaShell\nSienna\nSilver\nSkyBlue\nSlateBlue\nSlateGray\nSlateGrey\nSnow\nSpringGreen\nSteelBlue\nTECHNOLOGY\nTan\nTeal\nThistle\nTomato\nTurquoise\nViolet\nWheat\nWhite\nWhiteSmoke\nYellow\nYellowGreen\n\n;EOF\n,";

let cachedItems = undefined;

interface LanguageWord {
    kind: vscode.CompletionItemKind,
    name: string,
}

function getLanguageWords(): Promise<LanguageWord[]> {

    if (cachedItems !== undefined) return Promise.resolve(cachedItems);

    let task: Promise<string>;

    if (!config.java) {
        task = Promise.resolve(preDefinedWords);
    } else {

        let params = [
            '-Djava.awt.headless=true',
            '-jar',
            config.jar(undefined),
            "-language",
        ];

        let process = child_process.spawn(config.java, params);
        task = processWrapper(process).then(
            buf => buf.toString(),
            e => preDefinedWords
        )
    }
    return task.then(
        words => {
            cachedItems = processWords(words);
            return cachedItems;
        }
    )
}

function processWords(value: string): LanguageWord[] {
    let results: LanguageWord[] = [];
    let words = value.split('\n').map(w => w.trim());
    let curKind: vscode.CompletionItemKind = undefined;
    words.forEach(
        word => {
            if (!word) return;
            if (word.substr(0, 1) == ';') {
                switch (word) {
                    case ";type":
                        curKind = vscode.CompletionItemKind.Interface
                        return;
                    case ";keyword":
                        curKind = vscode.CompletionItemKind.Keyword
                        return;
                    case ";preprocessor":
                        curKind = vscode.CompletionItemKind.Class
                        return;
                    case ";skinparameter":
                        curKind = vscode.CompletionItemKind.Field
                        return;
                    case ";color":
                        curKind = vscode.CompletionItemKind.Color
                        return;
                    default:
                        return;
                }
            }
            if (!curKind) return;
            results.push(<LanguageWord>{ name: word, kind: curKind });
        }
    )
    return results;
}

export async function LanguageCompletionItems(): Promise<vscode.CompletionItem[]> {
    let words = await getLanguageWords();
    return words.map(word => {
        const item = new vscode.CompletionItem(word.name, word.kind);
        item.insertText = new vscode.SnippetString(word.name);
        return item;
    });
}