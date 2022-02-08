<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\CommentRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class CommentController extends AbstractController
{
    #[Route('/comment/list/{page}', name: 'comment_list', methods:["GET"])]
    public function list(CommentRepository $commentRepository, ?int $page = null): JsonResponse
    {
        $data = [];
        
        $qb = $commentRepository
            ->createQueryBuilder('c')
            ->addOrderBy('c.createDate', 'DESC');
        if($page) {
            $qb->andWhere('c.page = :page')->setParameter('page', $page);
        }

        $comments = $qb->getQuery()
            ->getResult()
        ;

        foreach($comments as $comment) {
            $data[] = [
                'id' => $comment->getId(),
                'content' => $comment->getContent(),
                'createDate' => $comment->getCreateDate()->format('d-m-Y à H:i:s'),
                'responseComment' => $comment->getResponseComment() ? $comment->getResponseComment()->getId() : null
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/comment/new', name: 'comment_new', methods:["POST"])]
    public function new(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $comment = new Comment();
        $comment->setCreateDate(new DateTime());

        $form = $this->createForm(CommentType::class, $comment);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $doctrine->getManager();
            $em->persist($comment);
            $em->flush();

            return new JsonResponse([
                "status" => true
            ]);
        }

        return new JsonResponse([
            "status" => false
        ]);
    }
}
